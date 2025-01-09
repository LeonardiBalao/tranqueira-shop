/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LoadingButton from "@/components/structure/loading-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitialPrompts } from "@/server/actions/create-review";
import { fetchAI } from "@/server/utils/functions";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";

interface CreateReviewCardProps {
  className?: string;
}

export default function RegisterProductCard({
  className,
}: CreateReviewCardProps) {
  const [title, setTitle] = useState({
    prompt: "",
    response: "",
    loading: false,
  });
  const [metaDescription, setMetaDescription] = useState({
    prompt: "",
    response: "",
    loading: false,
  });
  const [customerExperience, setCustomerExperience] = useState({
    prompt: "",
    response: "",
    loading: false,
  });
  const [pros, setPros] = useState<PromptState>({
    prompt: "",
    response: "",
    loading: false,
  });
  const [cons, setCons] = useState<PromptState>({
    prompt: "",
    response: "",
    loading: false,
  });
  const [keywords, setKeywords] = useState<PromptState>({
    prompt: "",
    response: "",
    loading: false,
  });
  const [costBenefit, setCostBenefit] = useState<PromptState>({
    prompt: "",
    response: "",
    loading: false,
  });
  const [finalConsiderations, setFinalConsiderations] = useState<PromptState>({
    prompt: "",
    response: "",
    loading: false,
  });

  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    categoryOne: "",
    categoryTwo: "",
    categoryThree: "",
    description: "",
    affiliateLink: "",
    imageAlt: "",
    imageSrc: "",
    videoSrc: "",
    rating: "",
    reviewsAmount: "",
    ordersAmount: "",
    discount: "",
  });

  //
  const fetchPrompts = async () => {
    const res = await getInitialPrompts(product);
    setTitle({ ...title, prompt: res.title });
    setMetaDescription({ ...metaDescription, prompt: res.metaDescription });
    setPros({ ...pros, prompt: res.pros });
    setCons({ ...cons, prompt: res.cons });
    setCostBenefit({ ...costBenefit, prompt: res.costBenefit });
    setFinalConsiderations({
      ...finalConsiderations,
      prompt: res.finalConsiderations,
    });
    setCustomerExperience({
      ...customerExperience,
      prompt: res.customerExperience,
    });
  };

  const handleKey = async (state: PromptState, promptName: keyof States) => {
    if (
      !product.name ||
      !product.description ||
      !product.discount ||
      !product.price ||
      !product.reviewsAmount ||
      !product.ordersAmount ||
      !product.rating
    )
      return toast.error("Preencher todos os dados do produto antes.");
    const response = await fetchAI(state.prompt, promptName);
    switch (promptName) {
      case "title":
        setTitle({ ...state, response });
        break;
      case "metaDescription":
        setMetaDescription({ ...state, response });
        break;
      case "pros":
        setPros({ ...state, response });
        break;
      case "cons":
        setCons({ ...state, response });
        break;
      case "costBenefit":
        setCostBenefit({ ...state, response });
        break;
      case "finalConsiderations":
        setFinalConsiderations({ ...state, response });
        break;
      case "customerExperience":
        setCustomerExperience({ ...state, response });
        break;
    }
  };

  return (
    <Card className={`${className} w-full`}>
      <CardHeader>
        <CardTitle className="text-xl">Criar review</CardTitle>
        <CardDescription>Adicione o produto da Shopee</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 w-full">
          <Label>Url de afiliado</Label>
          <Input
            placeholder="https://shopee.com.br/%C3%93culos-de-sol-europeus-da-moda-americana"
            type="text"
            value={product.affiliateLink}
            onChange={(e) =>
              setProduct({ ...product, affiliateLink: e.target.value })
            }
          />
          <Label>URL da Imagem</Label>
          <Input
            type="text"
            placeholder="URL"
            value={product.imageSrc}
            onChange={(e) =>
              setProduct({ ...product, imageSrc: e.target.value })
            }
          />
          <Label>URL do Vídeo</Label>
          <Input
            type="text"
            placeholder="URL"
            value={product.videoSrc}
            onChange={(e) =>
              setProduct({ ...product, videoSrc: e.target.value })
            }
          />
          <Label>Nome do Produto</Label>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Label>Categoria 1</Label>
          <Input
            type="text"
            placeholder="Categoria 1"
            value={product.categoryOne}
            onChange={(e) =>
              setProduct({ ...product, categoryOne: e.target.value })
            }
          />
          <Label>Categoria 2</Label>
          <Input
            type="text"
            placeholder="Categoria 2"
            value={product.categoryTwo}
            onChange={(e) =>
              setProduct({ ...product, categoryTwo: e.target.value })
            }
          />
          <Label>Categoria 3</Label>
          <Input
            type="text"
            placeholder="Categoria 3"
            value={product.categoryThree}
            onChange={(e) =>
              setProduct({ ...product, categoryThree: e.target.value })
            }
          />
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-4">
              <Label>Nota do Produto</Label>
              <Input
                type="number"
                placeholder="5"
                step="0.1"
                min="1"
                max="5"
                value={product.rating}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    rating:
                      parseInt(e.target.value) < 1 ||
                      parseInt(e.target.value) > 5
                        ? "5"
                        : e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Nº Avaliações do Produto</Label>
              <Input
                type="number"
                placeholder="1000"
                step="1"
                value={product.reviewsAmount}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    reviewsAmount:
                      parseInt(e.target.value) < 0 ? "0" : e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Nº Pedidos do Produto</Label>
              <Input
                type="number"
                placeholder="1000"
                step="1"
                value={product.ordersAmount}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    ordersAmount:
                      parseInt(e.target.value) < 0 ? "0" : e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-between">
            <div className="w-1/4">
              <Label>Desconto</Label>
              <CurrencyInput
                id="desconto"
                name="desconto"
                placeholder="32%"
                defaultValue={32}
                decimalsLimit={0}
                suffix="%"
                className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={product.discount}
                onValueChange={(e) =>
                  setProduct({
                    ...product,
                    discount: parseInt(e!) < 1 || parseInt(e!) > 100 ? "0" : e!,
                  })
                }
              />
            </div>
            <div className="w-3/5">
              <Label>Preço</Label>
              <CurrencyInput
                id="preco"
                name="preco"
                placeholder="R$ 0,00"
                defaultValue={0}
                decimalsLimit={0}
                prefix="R$ "
                className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={product.price}
                onValueChange={(e) =>
                  setProduct({
                    ...product,
                    price: parseFloat(e!) < 1 ? "1" : e!,
                  })
                }
              />
            </div>
          </div>
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descrição"
            className="h-40"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <Button onClick={() => fetchPrompts()}>Load Prompts</Button>
          <Label>Prompt de Título</Label>
          <Textarea
            placeholder="Prompt de título"
            className="h-52 bg-secondary"
            value={title.prompt}
            onChange={(e) =>
              setTitle({
                ...title,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <div className="flex gap-4 items-center">
            <LoadingButton
              text="Criar título"
              action={() => handleKey(title, "title")}
              loadingState={title}
              setLoadingState={setTitle}
              loadingText="Gerando..."
            />
          </div>
          <Label>Proposta de título</Label>
          <Textarea
            placeholder="Resposta de título"
            className="h-52"
            value={title.response}
            onChange={(e) => setTitle({ ...title, response: e.target.value })}
          />
          <Label>Prompt de Meta descrição</Label>
          <Textarea
            placeholder="Prompt de Meta Descrição"
            className="h-32 bg-secondary"
            value={metaDescription.prompt}
            onChange={(e) =>
              setMetaDescription({
                ...metaDescription,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar Meta Descrição"
            action={() => handleKey(metaDescription, "metaDescription")}
            loadingState={metaDescription}
            setLoadingState={setMetaDescription}
            loadingText="Gerando..."
          />
          <Label>Proposta de Meta Description</Label>
          <Textarea
            placeholder="Resposta de Meta Description"
            className="h-52"
            value={metaDescription.response}
            onChange={(e) =>
              setMetaDescription({
                ...metaDescription,
                response: e.target.value,
              })
            }
          />
          <Label>Prompt de Pros</Label>
          <Textarea
            placeholder="Prompt de Pros"
            className="h-52 bg-secondary"
            value={pros.prompt}
            onChange={(e) =>
              setPros({
                ...pros,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar PROS"
            action={() => handleKey(pros, "pros")}
            loadingState={pros}
            setLoadingState={setPros}
            loadingText="Gerando..."
          />
          <Label>Proposta de Pros</Label>
          <Textarea
            placeholder="Resposta de Pros"
            className="h-52"
            value={pros.response}
            onChange={(e) =>
              setPros({
                ...pros,
                response: e.target.value,
              })
            }
          />
          <div>
            <ul
              className="flex flex-col gap-1 text-xs"
              dangerouslySetInnerHTML={{ __html: pros.response }}
            ></ul>
          </div>
          <Label>Prompt de Cons</Label>
          <Textarea
            placeholder="Prompt de Cons"
            className="h-52 bg-secondary"
            value={cons.prompt}
            onChange={(e) =>
              setCons({
                ...cons,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar CONS"
            action={() => handleKey(cons, "cons")}
            loadingState={cons}
            setLoadingState={setCons}
            loadingText="Gerando..."
          />
          <Label>Proposta de Cons</Label>
          <Textarea
            placeholder="Resposta de Cons"
            className="h-52"
            value={cons.response}
            onChange={(e) =>
              setCons({
                ...cons,
                response: e.target.value,
              })
            }
          />
          <Label>Prompt de Custo Benefício</Label>
          <Textarea
            placeholder="Prompt de Custo Benefício"
            className="h-52 bg-secondary"
            value={costBenefit.prompt}
            onChange={(e) =>
              setCostBenefit({
                ...costBenefit,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar Custo-Benefício"
            action={() => handleKey(costBenefit, "costBenefit")}
            loadingState={costBenefit}
            setLoadingState={setCostBenefit}
            loadingText="Gerando..."
          />
          <Label>Proposta de Custo Benefício</Label>
          <Textarea
            placeholder="Resposta de Custo Benefício"
            className="h-52"
            value={costBenefit.response}
            onChange={(e) =>
              setCostBenefit({
                ...costBenefit,
                response: e.target.value,
              })
            }
          />
          <Label>Prompt de Custo Experiência do cliente</Label>
          <Textarea
            placeholder="Prompt de uX"
            className="h-52 bg-secondary"
            value={customerExperience.prompt}
            onChange={(e) =>
              setCustomerExperience({
                ...customerExperience,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar uX"
            action={() => handleKey(customerExperience, "customerExperience")}
            loadingState={customerExperience}
            setLoadingState={setCustomerExperience}
            loadingText="Gerando..."
          />
          <Label>Proposta de Experiência do Cliente</Label>
          <Textarea
            placeholder="Resposta de uX"
            className="h-52"
            value={customerExperience.response}
            onChange={(e) =>
              setCustomerExperience({
                ...customerExperience,
                response: e.target.value,
              })
            }
          />
          <Label>Prompt de Conclusão</Label>
          <Textarea
            placeholder="Prompt de conclusão"
            className="h-52 bg-secondary"
            value={finalConsiderations.prompt}
            onChange={(e) =>
              setFinalConsiderations({
                ...finalConsiderations,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar conclusão"
            action={() => handleKey(finalConsiderations, "finalConsiderations")}
            loadingState={finalConsiderations}
            setLoadingState={setFinalConsiderations}
            loadingText="Gerando..."
          />
          <Label>Proposta de Conclusão</Label>
          <Textarea
            placeholder="Resposta de conclusão"
            className="h-52"
            value={finalConsiderations.response}
            onChange={(e) =>
              setFinalConsiderations({
                ...finalConsiderations,
                response: e.target.value,
              })
            }
          />
          <Label>Prompt de Keywords</Label>
          <Textarea
            placeholder="Prompt de keywords"
            className="h-52 bg-secondary"
            value={keywords.prompt}
            onChange={(e) =>
              setKeywords({
                ...keywords,
                prompt: e.target.value,
              })
            }
            readOnly
          />
          <LoadingButton
            text="Criar keywords"
            action={() => handleKey(keywords, "keywords")}
            loadingState={keywords}
            setLoadingState={setKeywords}
            loadingText="Gerando..."
          />
          <Label>Proposta de Keywords</Label>
          <Textarea
            placeholder="Resposta de keywords"
            className="h-52"
            value={keywords.response}
            onChange={(e) =>
              setKeywords({
                ...keywords,
                response: e.target.value,
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
