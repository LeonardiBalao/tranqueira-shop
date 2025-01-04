"use client";

import LoadingButton from "@/components/structure/loading-button";
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
import { createReview } from "@/server/actions/create-review";
import { Product } from "@/types/custom";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

interface CreateReviewCardProps {
  className?: string;
}

export default function RegisterProductCard({
  className,
}: CreateReviewCardProps) {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    category1: "",
    category2: "",
    category3: "",
    description: "",
    affiliateLink: "",
    imageAlt: "",
    imageSrc: "",
    rating: "",
    reviewsAmount: "",
    ordersAmount: "",
    discount: "",
  });

  async function handleSubmit() {
    const res = await createReview(product);
    console.log(res);
  }
  return (
    <Card className={`${className} w-full`}>
      <CardHeader>
        <CardTitle className="text-xl">Criar review</CardTitle>
        <CardDescription>Adicione o produto da Shopee</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 w-full">
          <Label>Produto</Label>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Label>URL da Imagem</Label>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={product.imageSrc}
            onChange={(e) =>
              setProduct({ ...product, imageSrc: e.target.value })
            }
          />
          <Label>Texto alternativo de imagem</Label>
          <Input
            type="text"
            placeholder="Image Alt"
            value={product.imageAlt}
            onChange={(e) =>
              setProduct({ ...product, imageAlt: e.target.value })
            }
          />
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
                    discount: parseInt(e!) < 1 || parseInt(e!) > 100 ? "5" : e!,
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
          <Label>Categoria 1</Label>
          <Input
            type="text"
            placeholder="Categoria 1"
            value={product.category1}
            onChange={(e) =>
              setProduct({ ...product, category1: e.target.value })
            }
          />
          <Label>Categoria 2</Label>
          <Input
            type="text"
            placeholder="Categoria 2"
            value={product.category2}
            onChange={(e) =>
              setProduct({ ...product, category2: e.target.value })
            }
          />
          <Label>Categoria 3</Label>
          <Input
            type="text"
            placeholder="Categoria 3"
            value={product.category3}
            onChange={(e) =>
              setProduct({ ...product, category3: e.target.value })
            }
          />
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descrição"
            className="h-40"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <Label>Url de afiliado</Label>
          <Input
            placeholder="https://shopee.com.br/%C3%93culos-de-sol-europeus-da-moda-americana"
            type="text"
            value={product.affiliateLink}
            onChange={(e) =>
              setProduct({ ...product, affiliateLink: e.target.value })
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
        </div>
      </CardContent>
      <CardFooter>
        <LoadingButton text="Cadastrar Produto" action={handleSubmit} />
      </CardFooter>
    </Card>
  );
}
