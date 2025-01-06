"use server";

import { fetchAI, generateSlug, removeFormatting } from "../utils/functions";
import { Decimal } from "decimal.js";
import prisma from "@/prisma/db";

export const createReview = async (product: Product) => {
  if (!product.imageSrc) return "Product image src is required";
  if (!product.name) return "Product name is required";
  if (!product.price) return "Product price is required";
  if (!product.categoryOne) return "Product category is required";
  if (!product.categoryTwo) return "Product category is required";
  if (!product.description) return "Product description is required";
  if (!product.affiliateLink) return "Product affiliate link is required";
  if (!product.rating) return "Product rating is required";
  if (!product.reviewsAmount) return "Product reviews amount is required";
  if (!product.ordersAmount) return "Product orders amount is required";
  if (!product.discount) return "Product discount is required";

  // Qual o melhor prompt que posso passar para AI para que ela crie um título para minha postagem de review de produto da Shopee? Gostaria que fosse uma pergunta e que gerasse o interesse do usuario de ler a review e saber mais do produto. Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description
  // product.rating (nota do produto feita pelo usuário, de 1 a 5)
  // product.reviewsAmount (quantidade de reviews feitas pelos usuários)
  // product.ordersAmount (quantiidade de pedidos já feitos por usuários daquele produto)

  const promptTitle = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Concorde verbalmente com o substantivo. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie um título atrativo para uma postagem de review de produto na Shopee. O título deve ser uma pergunta que desperte o interesse do usuário em ler a review e saber mais sobre o produto. Nome do produto: ${product.name}. Inspire-se nos seguintes exemplos e adeque ao caso concreto: Revolucionário ou Apenas Mais Um? Avaliação Completa do [Nome do Produto] Descubra Por Que o [Nome do Produto] Está Mudando o Jogo Minha Experiência Com o [Nome do Produto]: Vale Cada Centavo? O Segredo Que Todo Mundo Está Usando: Avaliação do [Nome do Produto] Antes de Comprar: Tudo Que Você Precisa Saber Sobre o [Nome do Produto] Inovação em Suas Mãos: Avaliação Profunda do [Nome do Produto] O Melhor Investimento Para Seu Dinheiro? Análise do [Nome do Produto] Transforme Sua Rotina com o [Nome do Produto]: Minha Avaliação Honesta Você Não Vai Acreditar Nos Benefícios do [Nome do Produto] Por Que o [Nome do Produto] Está Dominando o Mercado? Avaliação Completa. Gere vários títulos e escolha somente um para enviar como o resposta, o que achar que vai gerar maior curiosidade de quem lê`;

  // Qual o melhor prompt que posso passar para AI para que ela crie uma breve descriçãopara minha postagem de review de produto da Shopee? Gostaria que fosse uma breve descrição das principais funcionalidades e uso. Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description
  // product.rating (nota do produto feita pelo usuário, de 1 a 5)
  // product.reviewsAmount (quantidade de reviews feitas pelos usuários)
  // product.ordersAmount (quantiidade de pedidos já feitos por usuários daquele produto)

  const promptBriefDescription = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. A resposta deve conter no máximo 150 caracteres. Crie uma breve descrição das principais funcionalidades e uso de um produto da Shopee, destacando seus benefícios e indicando por que ele pode valer a pena; use as informações: preço ${product.price}, descrição ${product.description}, avaliação ${product.rating} estrelas, quantidade de reviews ${product.reviewsAmount}, quantidade de pedidos ${product.ordersAmount}; a descrição deve ser objetiva, clara e com até 3 frases.`;

  // Qual o melhor prompt que posso passar para AI para que ela crie os pontos positivos do produto para minha postagem de review de produto da Shopee? Gostaria que liste rapidamente o que o produto faz. Seja direto e sincero, sem exagerar nos elogios. Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description

  const promptPros = `Não crie formatação de texto, apenas frases e estas deverão estar separadas por ";" por ponto positivo. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos positivos de um produto da Shopee de forma direta e sincera, destacando o que ele faz bem, sem exageros; use as informações: preço ${product.price}, descrição ${product.description}; a lista deve ser breve, clara e objetiva.`;

  // Qual o melhor prompt que posso passar para AI para que ela crie os pontos positivos do produto para minha postagem de review de produto da Shopee? Gostaria que liste rapidamente os pontos negativos do produto. Seja direto e sincero, sem exagerar nas críticas. Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description

  const promptCons = `Não crie formatação de texto, apenas frases e estas deverão estar separadas por ";" por ponto negativo. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Liste os pontos negativos de um produto da Shopee de forma direta e sincera, destacando possíveis limitações ou inconvenientes, sem exagerar nas críticas; use as informações: preço ${product.price}, descrição ${product.description}; a lista deve ser breve, clara e objetiva.`;

  const [title, briefDescription, pros, cons] = await Promise.all([
    fetchAI(promptTitle, "Título"),
    fetchAI(promptBriefDescription, "Descrição Breve"),
    fetchAI(promptPros, "Keywords"),
    fetchAI(promptCons, "Meta Description"),
  ]);

  // Qual o melhor prompt que posso passar para AI para que ela crie uma experiência do cliente que comprou o produto da minha postagem de review de produto da Shopee? Gostaria que crie uma breve experiência real com o produto. Cite se o produto entrega o que promete e se é prático no dia a dia.
  // Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description
  // product.pros (pontos positivos)
  // product.cons (pontos negativos)

  const promptCustomerExperience = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma breve experiência real de um cliente com um produto da Shopee, mencionando se ele entrega o que promete e se é prático no dia a dia; use as informações: preço ${product.price}, descrição ${product.description}, pontos positivos ${pros}, pontos negativos ${cons}; a experiência deve ser objetiva, sincera e com até 3 frases.`;

  // Qual o melhor prompt que posso passar para AI para que ela crie uma análise custo-benefício do produto que comprei da minha postagem de review de produto da Shopee? Gostaria que avalie se o preço condiz com a qualidade.
  // Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name
  // product.price
  // product.description
  // product.pros (pontos positivos)
  // product.cons (pontos negativos)

  const promptCostBenefit = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma análise custo-benefício de um produto da Shopee, avaliando se o preço condiz com a qualidade e levando em conta as funcionalidades, vantagens e desvantagens; use as informações: preço ${product.price}, descrição ${product.description}, pontos positivos ${pros}, pontos negativos ${cons}; a análise deve ser objetiva e com até 3 frases.`;

  const [customerExperience, costBenefit] = await Promise.all([
    fetchAI(promptCustomerExperience, "Experiência do cliente"),
    fetchAI(promptCostBenefit, "Custo-Benefício"),
  ]);

  // Qual o melhor prompt que posso passar para AI para que ela crie as considerações finais do produto que comprei da minha postagem de review de produto da Shopee? Gostaria que diga para quem o produto é ideal e traga uma análise conjunta da nota do produto, da quantidade de avaliações e da quantidade de produtos que já foram comprados por outros clientes.
  // Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // pros (pontos positivos)
  // cons (pontos negativos)
  // costBenefit
  // product.rating (nota do produto feita pelo usuário, de 1 a 5)
  // product.reviewsAmount (quantidade de reviews feitas pelos usuários)
  // product.ordersAmount (quantiidade de pedidos já feitos por usuários daquele produto)

  const promptFinalConsiderations = `Não crie formatação de texto, apenas texto. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma conclusão BEM OBJETIVA de toda review, indicando para quem ele é ideal e trazendo uma análise baseada nos pontos na nota do produto ${product.rating} (que pode variar de 1 a 5, sendo 5 a melhor), quantidade de reviews ${product.reviewsAmount} e pedidos ${product.ordersAmount}; a conclusão deve ser objetiva e ajudar o leitor a decidir se o produto vale a pena para ele.`;

  // Qual o melhor prompt que posso passar para AI para que ela crie keywords para minha postagem do produto que comprei da minha postagem de review de produto da Shopee? Gostaria que a AI soubesse que conhece todas as técnicas mais atuais de Search Query em motores de busca para gerar as possíveis perguntas que usuários que buscam por aquele produto ou aquela categoria de produtos fariam para os motores de busca quando vão comprar um produto daquele tipo. A reposta deve ser uma lista de perguntas bem curtas separadas por ponto e vírgula. Por favor gerar pelo menos 15 perguntas.
  // Para isso, passarei como parametros para a AI as seguintes variáveis do produto:
  // product.name // product.description // product.pros (pontos positivos) // product.cons (pontos negativos) // costBenefit
  // Responda em texto continuo, sem formatacoes ou espacamento ou indentacao

  const promptKeywords = `Não crie formatação de texto, apenas frases em formato de pergunta e estas deverão estar separadas por "?" por pergunta. Gere respostas em PT-BR. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Crie uma lista de perguntas curtas que usuários fariam em motores de busca ao procurar por um produto similar ao descrito abaixo, utilizando técnicas atuais de Search Query. As perguntas devem ser baseadas nas seguintes informações do produto: Nome: ${product.name}, Descrição: ${product.description}, Pontos Positivos: ${pros}, Pontos Negativos: ${cons}, Custo-Benefício: ${costBenefit}. A resposta deve ser uma lista de perguntas curtas separadas por ponto e vírgula. Por favor, gere pelo menos 15 perguntas.`;

  const [finalConsiderations, keywords] = await Promise.all([
    fetchAI(promptFinalConsiderations, "Considerações Finais"),
    fetchAI(promptKeywords, "Keywords"),
  ]);

  const fullReview = {
    title: removeFormatting(title),
    briefDescription: removeFormatting(briefDescription),
    pros: removeFormatting(pros),
    cons: removeFormatting(cons),
    cX: removeFormatting(customerExperience),
    cB: removeFormatting(costBenefit),
    fC: removeFormatting(finalConsiderations),
    keywords: removeFormatting(keywords),
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
