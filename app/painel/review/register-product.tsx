"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createReview,
  getInitialPrompts,
} from "@/server/actions/create-review";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import PromptTemplate from "./prompt-template";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CreateReviewCardProps {
  className?: string;
}

export default function RegisterProductCard({
  className,
}: CreateReviewCardProps) {
  const [title, setTitle] = useState({
    prompt: "",
    response: "",
  });
  const [metaDescription, setMetaDescription] = useState({
    prompt: "",
    response: "",
  });
  const [customerExperience, setCustomerExperience] = useState({
    prompt: "",
    response: "",
  });
  const [pros, setPros] = useState<PromptState>({
    prompt: "",
    response: "",
  });
  const [cons, setCons] = useState<PromptState>({
    prompt: "",
    response: "",
  });
  const [keywords, setKeywords] = useState<PromptState>({
    prompt: "",
    response: "",
  });
  const [costBenefit, setCostBenefit] = useState<PromptState>({
    prompt: "",
    response: "",
  });
  const [finalConsiderations, setFinalConsiderations] = useState<PromptState>({
    prompt: "",
    response: "",
  });

  const [form, setForm] = useState<Form>({
    name: "",
    price: "",
    categoryOne: "",
    categoryTwo: "",
    categoryThree: "",
    description: "",
    affiliateLink: "",
    imageAlt: "",
    imageSrc: "",
    imageAlt2: "",
    imageSrc2: "",
    videoSrc: "",
    rating: "",
    reviewsAmount: "",
    ordersAmount: "",
    discount: "",
  });

  //
  const fetchPrompts = async () => {
    const res = await getInitialPrompts(form, {
      pros: pros.response,
      cons: cons.response,
      costBenefit: costBenefit.response,
    });
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
    setKeywords({ ...keywords, prompt: res.keywords });
  };

  const handleSubmit = async () => {
    const newReview = await createReview(form, {
      title,
      customerExperience,
      metaDescription,
      cons,
      pros,
      costBenefit,
      finalConsiderations,
      keywords,
    });
    if (newReview) {
      toast.success("Review criada com sucesso");
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
            value={form.affiliateLink}
            onChange={(e) =>
              setForm({ ...form, affiliateLink: e.target.value })
            }
          />
          <Label>URL da Imagem</Label>
          <Input
            type="text"
            placeholder="URL"
            value={form.imageSrc}
            onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
          />
          <Label>URL da Imagem Secundária</Label>
          <Input
            type="text"
            placeholder="URL"
            value={form.imageSrc2}
            onChange={(e) => setForm({ ...form, imageSrc2: e.target.value })}
          />
          <Label>URL do Vídeo</Label>
          <Input
            type="text"
            placeholder="URL"
            value={form.videoSrc}
            onChange={(e) => setForm({ ...form, videoSrc: e.target.value })}
          />
          <Label>Nome do Produto</Label>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                value={form.rating}
                onChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.reviewsAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.ordersAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.discount}
                onValueChange={(e) =>
                  setForm({
                    ...form,
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
                value={form.price}
                onValueChange={(e) =>
                  setForm({
                    ...form,
                    price: parseFloat(e!) < 1 ? "1" : e!,
                  })
                }
              />
            </div>
          </div>
          <Label>Categoria 1</Label>
          <Input
            type="text"
            placeholder="Categoria 1"
            value={form.categoryOne}
            onChange={(e) => setForm({ ...form, categoryOne: e.target.value })}
          />
          <Label>Categoria 2</Label>
          <Input
            type="text"
            placeholder="Categoria 2"
            value={form.categoryTwo}
            onChange={(e) => setForm({ ...form, categoryTwo: e.target.value })}
          />
          <Label>Categoria 3</Label>
          <Input
            type="text"
            placeholder="Categoria 3"
            value={form.categoryThree}
            onChange={(e) =>
              setForm({ ...form, categoryThree: e.target.value })
            }
          />
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descrição"
            className="h-40"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <PromptTemplate
            state={title}
            setState={setTitle}
            stateKey="title"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={metaDescription}
            setState={setMetaDescription}
            stateKey="metaDescription"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={pros}
            setState={setPros}
            stateKey="pros"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={cons}
            setState={setCons}
            stateKey="cons"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={finalConsiderations}
            setState={setFinalConsiderations}
            stateKey="finalConsiderations"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={costBenefit}
            setState={setCostBenefit}
            stateKey="costBenefit"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={customerExperience}
            setState={setCustomerExperience}
            stateKey="customerExperience"
            fetchPrompt={fetchPrompts}
            form={form}
          />
          <PromptTemplate
            state={keywords}
            setState={setKeywords}
            stateKey="keywords"
            fetchPrompt={fetchPrompts}
            form={form}
          />
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button onClick={handleSubmit} className="w-full">
          Criar Review
        </Button>
      </CardFooter>
    </Card>
  );
}
