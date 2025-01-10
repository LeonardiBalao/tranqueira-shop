"use server";

import prisma from "@/prisma/db";
import { generateSlug, removeFormatting } from "../utils/functions";
import Decimal from "decimal.js";

const getPrompt = (
  type: string,
  form: Form,
  requiredPrompts?: RequiredPrompts
) => {
  const promptTitle = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Concorde verbalmente com o substantivo. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie um título atrativo para uma postagem de review de produto na Shopee. O título deve ser uma pergunta que desperte o interesse do usuário em ler a review e saber mais sobre o produto.\nNome do produto: ${form.name}.\nInspire-se nos seguintes exemplos e adeque ao caso concreto: Revolucionário ou Apenas Mais Um? Avaliação Completa do [Nome do Produto] Descubra Por Que o [Nome do Produto] Está Mudando o Jogo? Minha Experiência Com o [Nome do Produto]: Vale Cada Centavo? Antes de Comprar: Tudo Que Você Precisa Saber Sobre o [Nome do Produto] Inovação em Suas Mãos: Avaliação do [Nome do Produto] Transforme Sua Rotina com o [Nome do Produto]: Minha Avaliação Honesta. Você Não Vai Acreditar Nos Benefícios do [Nome do Produto] Por Que o [Nome do Produto] Está Dominando o Mercado? Avaliação Completa. Gere vários títulos e escolha somente um para enviar como o resposta, o que achar que vai gerar maior curiosidade de quem lê`;

  const promptMetaDescription = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. A resposta deve conter no máximo 150 caracteres. Crie uma breve descrição das principais funcionalidades e uso de um produto da Shopee, destacando seus benefícios e indicando por que ele pode valer a pena; use as informações: \npreço ${form.price}, \ndescrição ${form.description}, \navaliação ${form.rating} estrelas, \nquantidade de reviews ${form.reviewsAmount}, \nquantidade de pedidos ${form.ordersAmount}; a descrição deve ser objetiva, clara e com até 3 frases.`;

  const promptPros = `Não crie formatação de texto. Separe cada item com ";". Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos positivos de um produto da Shopee de forma direta e sincera, destacando o que ele faz bem, sem exageros; use as informações: \npreço ${form.price}, \ndescrição ${form.description}; a lista deve ser breve, clara e objetiva. Adicione`;

  const promptCons = `Não crie formatação de texto. Separe cada item com ";". Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos negativos de um produto da Shopee de forma direta e sincera, destacando possíveis limitações ou inconvenientes, sem exagerar nas críticas; use as informações: \npreço ${form.price}, \ndescrição ${form.description}; a lista deve ser breve, clara e objetiva.`;

  const promptFinalConsiderations = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma conclusão BEM OBJETIVA de toda review, indicando para quem ele é ideal e trazendo uma análise baseada nos pontos na nota do produto \n${form.rating} (que pode variar de 1 a 5, sendo 5 a melhor), \nquantidade de reviews ${form.reviewsAmount} e \npedidos ${form.ordersAmount}; a conclusão deve ser objetiva e ajudar o leitor a decidir se o produto vale a pena para ele.`;

  const promptCustomerExperience = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma breve experiência real como se fosse você usando o seguinte produto, de forma informal e descontraída, mencionando se o produto entrega o que promete e se é prático no dia a dia; use as informações: \npreço ${form.price}, \ndescrição ${form.description}, \npontos positivos ${requiredPrompts?.pros}, \npontos negativos ${requiredPrompts?.cons}; a experiência deve ser objetiva, sincera e com até 3 frases. Ao final do texto, adicione o seguinte: "Se você gostou da minha experiência, clique no link da bio e procure por ${form.name}, assim me ajuda a continuar testando produtos e produzindo conteúdo de qualidade. Deixe um joinha e um emoji, quem sabe você não ganha um?"`;

  const promptCostBenefit = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma análise custo-benefício de um produto da Shopee, avaliando se o preço condiz com a qualidade e levando em conta as funcionalidades, vantagens e desvantagens; use as informações: \npreço ${form.price}, \ndescrição ${form.description}, \npontos positivos ${requiredPrompts?.pros}, \npontos negativos ${requiredPrompts?.cons}; a análise deve ser objetiva e com até 3 frases.`;

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

export const fetchServerAI = async (
  prompt: string | undefined,
  type: string | undefined
) => {
  return await fetchAI(prompt, type);
};

export const fetchAI = async (
  prompt: string | undefined,
  type: string | undefined
) => {
  if (prompt === undefined || type === undefined) return "";
  console.log(`Gerando ${type}`);
  const url = `https://147.79.82.202:11434/api/generate`;
  const promptData = {
    model: "qwen2.5:14b",
    prompt,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promptData),
  });

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to get reader from response body");
  }

  const decoder = new TextDecoder("utf-8");

  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter(Boolean); // Split by new lines and filter out empty lines
    for (const line of lines) {
      try {
        // console.log("Parsing line:", line); // Add this line to log the content
        if (line.trim().startsWith("{") && line.trim().endsWith("}")) {
          // Check if the line looks like a JSON object
          const json = JSON.parse(line);
          console.log(line);
          if (json.response) {
            result += json.response;
          }
        } else {
          console.warn("Skipping invalid JSON."); // Warn about invalid JSON lines
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }
  }

  result += decoder.decode(); // Decode any remaining bytes
  return result;
};
