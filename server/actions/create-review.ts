"use server";

import prisma from "@/prisma/db";
import { generateSlug, removeFormatting } from "../utils/functions";
import Decimal from "decimal.js";

const getPrompt = (
  type: string,
  product: Product,
  requiredPrompts?: States
) => {
  const promptTitle = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Concorde verbalmente com o substantivo. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie um título atrativo para uma postagem de review de produto na Shopee. O título deve ser uma pergunta que desperte o interesse do usuário em ler a review e saber mais sobre o produto.\nNome do produto: ${product.name}.\nInspire-se nos seguintes exemplos e adeque ao caso concreto: Revolucionário ou Apenas Mais Um? Avaliação Completa do [Nome do Produto] Descubra Por Que o [Nome do Produto] Está Mudando o Jogo? Minha Experiência Com o [Nome do Produto]: Vale Cada Centavo? Antes de Comprar: Tudo Que Você Precisa Saber Sobre o [Nome do Produto] Inovação em Suas Mãos: Avaliação do [Nome do Produto] Transforme Sua Rotina com o [Nome do Produto]: Minha Avaliação Honesta. Você Não Vai Acreditar Nos Benefícios do [Nome do Produto] Por Que o [Nome do Produto] Está Dominando o Mercado? Avaliação Completa. Gere vários títulos e escolha somente um para enviar como o resposta, o que achar que vai gerar maior curiosidade de quem lê`;

  const promptMetaDescription = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. A resposta deve conter no máximo 150 caracteres. Crie uma breve descrição das principais funcionalidades e uso de um produto da Shopee, destacando seus benefícios e indicando por que ele pode valer a pena; use as informações: preço ${product.price}, descrição ${product.description}, avaliação ${product.rating} estrelas, quantidade de reviews ${product.reviewsAmount}, quantidade de pedidos ${product.ordersAmount}; a descrição deve ser objetiva, clara e com até 3 frases.`;

  const promptPros = `Não crie formatação de texto, apenas frases e cada uma deve estar inserida dentro de uma tag html <li></li> e também adicionar tag de negrito para os adjetivos de cada item da li. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos positivos de um produto da Shopee de forma direta e sincera, destacando o que ele faz bem, sem exageros; use as informações: \npreço ${product.price}, \ndescrição ${product.description}; a lista deve ser breve, clara e objetiva. Adicione`;

  const promptCons = `Não crie formatação de texto, apenas frases e estas deverão estar separadas por ";" por ponto negativo. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos negativos de um produto da Shopee de forma direta e sincera, destacando possíveis limitações ou inconvenientes, sem exagerar nas críticas; use as informações: preço ${product.price}, descrição ${product.description}; a lista deve ser breve, clara e objetiva.`;

  const promptFinalConsiderations = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma conclusão BEM OBJETIVA de toda review, indicando para quem ele é ideal e trazendo uma análise baseada nos pontos na nota do produto ${product.rating} (que pode variar de 1 a 5, sendo 5 a melhor), quantidade de reviews ${product.reviewsAmount} e pedidos ${product.ordersAmount}; a conclusão deve ser objetiva e ajudar o leitor a decidir se o produto vale a pena para ele.`;

  const promptCustomerExperience = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma breve experiência real de um cliente com um produto da Shopee, mencionando se ele entrega o que promete e se é prático no dia a dia; use as informações: preço ${product.price}, descrição ${product.description}, pontos positivos ${requiredPrompts?.pros}, pontos negativos ${requiredPrompts?.cons}; a experiência deve ser objetiva, sincera e com até 3 frases.`;

  const promptCostBenefit = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma análise custo-benefício de um produto da Shopee, avaliando se o preço condiz com a qualidade e levando em conta as funcionalidades, vantagens e desvantagens; use as informações: preço ${product.price}, descrição ${product.description}, pontos positivos ${requiredPrompts?.pros}, pontos negativos ${requiredPrompts?.cons}; a análise deve ser objetiva e com até 3 frases.`;

  const promptKeywords = `Não crie formatação de texto, apenas frases em formato de pergunta e estas deverão estar separadas por ponto e vírgula. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma lista de perguntas curtas que usuários fariam em motores de busca ao procurar por um produto similar ao descrito abaixo, utilizando técnicas atuais de Search Query. As perguntas devem ser baseadas nas seguintes informações do produto: Nome: ${product.name}, Descrição: ${product.description}, Pontos Positivos: ${requiredPrompts?.pros}, Pontos Negativos: ${requiredPrompts?.cons}, Custo-Benefício: ${requiredPrompts?.costBenefit}. A resposta deve ser uma lista de perguntas curtas separadas por ponto e vírgula. Por favor, gere pelo menos 15 perguntas.`;

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

export const createReview = async (product: Product, prompts: States) => {
  const {
    title,
    metaDescription,
    pros,
    cons,
    customerExperience,
    costBenefit,
    finalConsiderations,
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
      name: product.name,
      keywords: fullReview.keywords.split(";"),
      metaDescription: fullReview.briefDescription,
      imageAlt: generateSlug(product.name),
      imageSrc: product.imageSrc,
      videoSrc: product.videoSrc ? product.videoSrc : null,
      discount: parseInt(product.discount),
      price: new Decimal(product.price.replace(",", ".")),
      pros: fullReview.pros.split(";"),
      cons: fullReview.cons.split(";"),
      customerExperience: fullReview.cX,
      costBenefit: fullReview.cB,
      finalConsiderations: fullReview.fC,
      categoryOne: product.categoryOne,
      categoryOneSlug: generateSlug(product.categoryOne),
      categoryTwo: product.categoryTwo,
      categoryTwoSlug: generateSlug(product.categoryTwo),
      categoryThree: product.categoryThree,
      categoryThreeSlug: product.categoryThree
        ? generateSlug(product.categoryThree)
        : null,
      affiliateLink: product.affiliateLink,
      rating: new Decimal(product.rating.replace(",", ".")),
      reviewsAmount: parseInt(product.reviewsAmount),
      ordersAmount: parseInt(product.ordersAmount),
    },
  });

  return fullReview;
};

export const getInitialPrompts = async (product: Product) => {
  const prompt = {
    title: getPrompt("title", product),
    costBenefit: getPrompt("costBenefit", product),
    customerExperience: getPrompt("customerExperience", product),
    metaDescription: getPrompt("metaDescription", product),
    pros: getPrompt("pros", product),
    cons: getPrompt("cons", product),
    finalConsiderations: getPrompt("finalConsiderations", product),
  };

  return prompt;
};
