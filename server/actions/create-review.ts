"use server";

import prisma from "@/prisma/db";
import { generateSlug, removeFormatting } from "../utils/functions";
import Decimal from "decimal.js";

const getPrompt = (
  type: string,
  form: Form,
  requiredPrompts?: RequiredPrompts
) => {
  const promptTitle = `Sem firulas! Crie um título bombástico e super chamativo, no formato de pergunta, que desperte MUITA curiosidade para clicar na review de um produto da Shopee.  
 
  Nome do produto: ${form.name}.
   
  Inspire-se nos exemplos abaixo e adapte ao caso:  
  - É Bom Mesmo ou Pura Enganação? Testei o [Nome do Produto]!  
  - Antes de Comprar o [Nome do Produto], Você Precisa Saber Isso!  
  - Vale a Grana ou é Furada? O [Nome do Produto] na Real...  
  - Comprei o [Nome do Produto] e Me Surpreendi! Leia Antes!  
  - Todo Mundo Tá Falando do [Nome do Produto]... Mas Por Quê?  
   
  Responda com um título irresistível, de até 60 caracteres.`;

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

  - Descrição: ${form.description}`;

  const promptFinalConsiderations = `Apenas texto, sem formatação ou mensagens adicionais. Crie uma conclusão direta e objetiva da review, indicando para quem o produto é mais adequado e trazendo uma análise final baseada nos seguintes dados:

  - Nome: ${form.name}
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

  const promptKeywords = `Sem firulas! Crie uma lista de pelo menos 15 perguntas curtas e diretas que usuários fariam em motores de busca ao procurar por um produto similar ao descrito abaixo. Use técnicas atuais de Search Query e gere as perguntas em PT-BR, separadas por ponto e vírgula. Responda apenas com as perguntas, sem mensagens adicionais.  
 
  Informações do produto:  
  - Nome: ${form.name}  
  - Descrição: ${form.description}  
  - Pontos Positivos: ${requiredPrompts?.pros}  
  - Pontos Negativos: ${requiredPrompts?.cons}  
  - Custo-Benefício: ${requiredPrompts?.costBenefit}`;

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
