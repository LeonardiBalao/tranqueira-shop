"use server";

import prisma from "@/prisma/db";
import { generateSlug, removeFormatting } from "../utils/functions";
import Decimal from "decimal.js";

const getPrompt = (
  type: string,
  form: Form,
  requiredPrompts?: RequiredPrompts
) => {
  const promptTitle = `Apenas texto, sem formatação ou mensagens adicionais. Crie um título incrivelmente atrativo para uma postagem de review de produto na Shopee. O título deve ser uma pergunta altamente apelativa que desperte extrema curiosidade e vontade de clicar.

  Nome do produto: ${form.name}.
  
  Inspire-se nos seguintes exemplos e adeque ao caso concreto:
  - É Tudo Isso Mesmo? Minha Experiência Real com o [Nome do Produto]
  - Antes de Comprar o [Nome do Produto], Leia Isso!
  - O [Nome do Produto] Vale Mesmo a Pena? Descubra!
  - Não Compre o [Nome do Produto] Sem Ler Esta Review!
  - Por Que Todo Mundo Está Falando do [Nome do Produto]?
  - O [Nome do Produto] Entrega o Que Promete? Veja Agora!
  
  Responda apenas com o título mais impactante e chamativo que você criar.`;

  const promptMetaDescription = `Apenas texto, sem formatação ou mensagens adicionais. Crie uma descrição breve e altamente atrativa para um produto da Shopee, destacando suas funcionalidades e benefícios. A resposta deve ser clara, objetiva e conter no máximo 150 caracteres, com até 3 frases curtas. Use as seguintes informações:

  - Preço: ${form.price}
  - Descrição: ${form.description}
  - Avaliação: ${form.rating} estrelas
  - Quantidade de reviews: ${form.reviewsAmount}
  - Quantidade de pedidos: ${form.ordersAmount}`;

  const promptPros = `Apenas texto, sem formatação ou mensagens adicionais. Liste os pontos positivos de um produto da Shopee de forma direta, objetiva e sincera. Separe cada item com ";". Destaque apenas o que o produto faz bem, sem exageros, usando as seguintes informações:

  - Preço: ${form.price}
  - Descrição: ${form.description}`;

  const promptCons = `Apenas texto, sem formatação ou mensagens adicionais. Liste os pontos negativos de um produto da Shopee de forma direta, sincera e objetiva. Separe cada item com ";". Destaque possíveis limitações ou inconvenientes sem exageros, usando as seguintes informações:

  - Preço: ${form.price}
  - Descrição: ${form.description}`;

  const promptFinalConsiderations = `Apenas texto, sem formatação ou mensagens adicionais. Crie uma conclusão direta e objetiva da review, indicando para quem o produto é mais adequado e trazendo uma análise final baseada nos seguintes dados:

  - Nota do produto: ${form.rating} (de 1 a 5)
  - Quantidade de reviews: ${form.reviewsAmount}
  - Quantidade de pedidos: ${form.ordersAmount}
  
  A conclusão deve ajudar o leitor a decidir se o produto vale a pena.`;

  const promptCustomerExperience = `Apenas texto, sem formatação ou mensagens adicionais. Crie uma breve experiência real e descontraída como se fosse você usando o produto, mencionando se ele entrega o que promete e se é prático no dia a dia. A resposta deve ser sincera, objetiva e conter até 3 frases. Use as seguintes informações:

  - Nome: ${form.name}
  - Preço: ${form.price}
  - Descrição: ${form.description}
  - Pontos positivos: ${requiredPrompts?.pros}
  - Pontos negativos: ${requiredPrompts?.cons}
  
  Finalize com a seguinte frase: "Se você gostou da minha experiência, clique no link da bio e procure por ${form.name}, assim me ajuda a continuar testando produtos e produzindo conteúdo de qualidade. Deixe um joinha e um emoji, quem sabe você não ganha um?"`;

  const promptCostBenefit = `Apenas texto, sem formatação ou mensagens adicionais. Crie uma análise custo-benefício objetiva de um produto da Shopee, avaliando se o preço condiz com a qualidade. Considere as funcionalidades, vantagens e desvantagens. A resposta deve ter até 3 frases. Use as seguintes informações:

  - Preço: ${form.price}
  - Descrição: ${form.description}
  - Pontos positivos: ${requiredPrompts?.pros}
  - Pontos negativos: ${requiredPrompts?.cons}`;

  const promptKeywords = `Não crie formatação de texto, apenas frases em formato de pergunta. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma lista de perguntas curtas que usuários fariam em motores de busca ao procurar por um produto similar ao descrito abaixo, utilizando técnicas atuais de Search Query. As perguntas devem ser baseadas nas seguintes informações do produto: Nome: \n${form.name}, \nDescrição: ${form.description}, \nPontos Positivos: ${requiredPrompts?.pros}, \nPontos Negativos: ${requiredPrompts?.cons}, \nCusto-Benefício: ${requiredPrompts?.costBenefit}. A resposta deve ser uma lista de perguntas curtas separadas por ponto e vírgula. Por favor, gere pelo menos 15 perguntas.`;

  switch (type) {
    case "title":
      return promptTitle;
    case "metaDescription":
      return promptMetaDescription;
    case "pros":
      return promptPros;
    case "cons":
      return promptCons;
    case "customerExperience":
      return promptCustomerExperience;
    case "costBenefit":
      return promptCostBenefit;
    case "finalConsiderations":
      return promptFinalConsiderations;
    case "keywords":
      return promptKeywords;
    default:
      return "Wrong type";
  }
};

export const createReview = async (form: Form, prompts: States) => {
  const {
    title,
    metaDescription,
    pros,
    cons,
    customerExperience,
    costBenefit,
    finalConsiderations,
    keywords,
  } = prompts;

  const fullReview = {
    title: removeFormatting(title.response),
    briefDescription: removeFormatting(metaDescription.response),
    pros: removeFormatting(pros.response),
    cons: removeFormatting(cons.response),
    cX: removeFormatting(customerExperience.response),
    cB: removeFormatting(costBenefit.response),
    fC: removeFormatting(finalConsiderations.response),
    keywords: removeFormatting(keywords.response),
  };

  await prisma.review.create({
    data: {
      title: fullReview.title,
      titleSlug: generateSlug(fullReview.title),
      name: form.name,
      keywords: fullReview.keywords.split("?"),
      metaDescription: fullReview.briefDescription,
      imageAlt: generateSlug(form.name),
      imageSrc: form.imageSrc,
      imageAlt2: generateSlug(form.name),
      imageSrc2: form.imageSrc2,
      videoSrc: form.videoSrc ? form.videoSrc : null,
      discount: parseInt(form.discount),
      price: new Decimal(form.price.replace(",", ".")),
      pros: fullReview.pros.split(";"),
      cons: fullReview.cons.split(";"),
      customerExperience: fullReview.cX,
      costBenefit: fullReview.cB,
      finalConsiderations: fullReview.fC,
      categoryOne: form.categoryOne,
      categoryOneSlug: generateSlug(form.categoryOne),
      categoryTwo: form.categoryTwo,
      categoryTwoSlug: generateSlug(form.categoryTwo),
      categoryThree: form.categoryThree,
      categoryThreeSlug: form.categoryThree
        ? generateSlug(form.categoryThree)
        : null,
      affiliateLink: form.affiliateLink,
      rating: new Decimal(form.rating.replace(",", ".")),
      reviewsAmount: parseInt(form.reviewsAmount),
      ordersAmount: parseInt(form.ordersAmount),
    },
  });

  return fullReview;
};

export const getInitialPrompts = async (
  form: Form,
  requiredPrompts?: RequiredPrompts
) => {
  const prompt = {
    title: getPrompt("title", form),
    metaDescription: getPrompt("metaDescription", form),
    pros: getPrompt("pros", form),
    cons: getPrompt("cons", form),
    finalConsiderations: getPrompt("finalConsiderations", form),
    costBenefit: getPrompt("costBenefit", form, requiredPrompts),
    customerExperience: getPrompt("customerExperience", form, requiredPrompts),
    keywords: getPrompt("keywords", form, requiredPrompts),
  };

  return prompt;
};
