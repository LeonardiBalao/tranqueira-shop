"use server";

import { Product } from "@/types/custom";
import { fetchAI, generateSlug } from "../utils/functions";
import { Decimal } from "decimal.js";
import prisma from "@/prisma/db";

export const createReview = async (product: Product) => {
  if (!product.imageAlt) return "Product image alt is required";
  if (!product.imageSrc) return "Product image src is required";
  if (!product.name) return "Product name is required";
  if (!product.price) return "Product price is required";
  if (!product.category1) return "Product category is required";
  if (!product.category2) return "Product category is required";
  if (!product.description) return "Product description is required";
  if (!product.affiliateLink) return "Product affiliate link is required";
  if (!product.rating) return "Product rating is required";
  if (!product.reviewsAmount) return "Product reviews amount is required";
  if (!product.ordersAmount) return "Product orders amount is required";
  if (!product.discount) return "Product discount is required";

  const promptReview = `Você é uma influenciadora digital super famosa, carismática e comunicativa. Utilize adjetivos variados e evite repetição. Seja objetiva e crie avaliações com até 1000 caracteres, utilizando linguagem informal e que gere engajamento com um público simples. Crie uma avaliação do produto a seguir:Nome do produto: ${product.name}Preço: ${product.price} Desconto: ${product.discount} Categorias: ${product.category1}, ${product.category2}, ${product.category3} Descrição: ${product.description} Inclua uma breve análise da nota dos usuários (nota de 1 a 5): ${product.rating} Quantidade de avaliações: ${product.reviewsAmount} Quantidade de pedidos: ${product.ordersAmount} Lembre-se de usar um tom divertido e cativante para envolver seu público. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais.`;

  const review = await fetchAI(promptReview, "Review");

  const promptReviewHTML = `Você é um mestre em escrita de blogs, compreende profundamente HTML semântico e técnicas de SEO. Como especialista em reviews de produtos, você sabe como criar conteúdo de alta qualidade para o público nas redes sociais. Formate o seguinte texto em HTML, utilizando tags semânticas e práticas de SEO. Adicione classNames de Tailwind para customizá-las. Inclua listas ordenadas e não ordenadas, diferentes headings (começando em h2 e terminando em h5), sublinhados e negritos para enfatizar os pontos mais importantes. Responda apenas com texto HTML, sem as tags html, head, body e main. Inclua perguntas comuns que os usuários podem fazer sobre o produto e responda a elas no conteúdo. Use variações de palavras-chave (sinônimos e variações) para capturar um público mais amplo. Texto a ser formatado: ${review}. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais.`;

  // const reviewHtml = await fetchAI(promptReviewHTML, "Review HTML");

  const promptTitle = `Você é um mestre em escrita de blogs, compreende profundamente HTML semântico e técnicas de SEO. Como especialista em reviews de produtos, você sabe como criar conteúdo de alta qualidade para o público nas redes sociais. Crie um título que contenha o tipo do produto e que seja uma pergunta que o usuário faria no search bar do Google para pesquisar sobre a qualidade de marcas diferentes daquele produto na Shopee. Exemplo de título: "Vale a Pena Comprar Fritadeiras Airfryer de Marcas Diferentes na Shopee? Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais." Use o review a seguir: \n${review}`;
  // const title = await fetchAI(promptTitle, "Título");

  const promptKeywords = `Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais. Você é um mestre em escrita de blogs, compreende profundamente HTML semântico e técnicas de SEO. Crie as palavras-chave da minha publicação: Instruções: A reposta deve ser uma lista de palavras separadas por ponto e vírgula. 1. **Densidade de Palavras-Chave:** A densidade de palavras-chave deve estar entre 1% e 2% do total de palavras do seu texto. Para um texto de 1000 palavras, utilize 10 palavras-chave. 2. **Naturalidade:** Insira as palavras-chave de forma natural. Evite "keyword stuffing", que pode ser penalizado pelos motores de busca e tornar o texto difícil de ler. 3. **Variedade de Palavras-Chave:** Use uma mistura de palavras-chave principais e secundárias. Palavras-chave principais estão diretamente relacionadas ao tema, enquanto as secundárias são variações ou sinônimos. 4. **Localização das Palavras-Chave:** Distribua as palavras-chave de forma estratégica ao longo do texto, aparecendo em: - Títulos e subtítulos - Primeiras 100 palavras do texto - Meta descrição - URL - Texto alternativo de imagens. Exemplo de Distribuição de Palavras-Chave: Para um artigo de 1000 palavras sobre "Receitas Veganas": - Palavra-chave principal: Receitas Veganas (10 a 15 vezes) - Palavras-chave secundárias: Receitas saudáveis, pratos veganos, dieta vegana (2 a 5 vezes cada) Texto a ser usado para gerar as palavras-chave seguindo a lógica acima:\n${review}.`;
  // const keywords = await fetchAI(promptKeywords, "Keywords");

  console.log("Gerando MetaDescription");
  const promptMetaDescription = `Você é um especialista em escrita de blogs, HTML semântico e técnicas de SEO. Crie uma meta description envolvente para a publicação seguindo as instruções abaixo: Instruções: 1. **Comprimento:** A meta description deve ter entre 150 caracteres. 2. **Palavras-Chave:** Inclua as palavras-chave principais de forma natural. 3. **Atraente:** Certifique-se de que a meta description seja atraente e estimule os usuários a clicarem no link. 4. **Clareza:** A descrição deve ser clara e informar sobre o conteúdo da página. 5. **Call-to-Action:** Sempre que possível, inclua uma chamada para ação (call-to-action) que incentive o clique. Exemplo: Para um artigo sobre "Receitas Veganas": - Meta description: "Descubra as melhores receitas veganas com pratos saudáveis e deliciosos. Confira nossas dicas e inspire-se! Clique agora e explore!" Texto a ser usado para gerar a meta description seguindo a lógica acima:\n${review}. Responda apenas com o que foi pedido, sem mensagens introdutórias ou adicionais.`;

  // const metaDescription = await fetchAI(
  //   promptMetaDescription,
  //   "Meta Description"
  // );

  const [reviewHTML, title, keywords, metaDescription] = await Promise.all([
    fetchAI(promptReviewHTML, "Review HTML"),
    fetchAI(promptTitle, "Título"),
    fetchAI(promptKeywords, "Keywords"),
    fetchAI(promptMetaDescription, "Meta Description"),
  ]);

  const fullReview = {
    name: product.name,
    discount: product.discount,
    price: product.price,
    imageAlt: product.imageAlt,
    imageSrc: product.imageSrc,
    categoryOne: product.category1,
    categoryTwo: product.category2,
    categoryThree: product.category3,
    description: product.description,
    affiliateLink: product.affiliateLink,
    rating: product.rating,
    reviewsAmount: product.reviewsAmount,
    ordersAmount: product.ordersAmount,
    title,
    review,
    reviewHTML: reviewHTML,
    keywords,
    metaDescription,
  };

  await prisma.review.create({
    data: {
      title: fullReview.title,
      titleSlug: generateSlug(title),
      review: fullReview.review,
      reviewHTML: fullReview.reviewHTML,
      keywords: fullReview.keywords.split(";"),
      metaDescription: fullReview.metaDescription,
      name: product.name,
      discount: parseInt(product.discount),
      price: new Decimal(product.price.replace(",", ".")),
      imageAlt: product.imageAlt,
      imageSrc: product.imageSrc,
      categoryOne: product.category1,
      categoryOneSlug: generateSlug(product.category1),
      categoryTwo: product.category2,
      categoryTwoSlug: generateSlug(product.category2),
      categoryThree: product.category3,
      categoryThreeSlug: generateSlug(product.category3),
      affiliateLink: product.affiliateLink,
      rating: new Decimal(product.rating.replace(",", ".")),
      reviewsAmount: parseInt(product.reviewsAmount),
      ordersAmount: parseInt(product.ordersAmount),
    },
  });

  return fullReview;
};
