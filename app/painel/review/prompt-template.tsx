/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchServerAI } from "@/server/utils/functions";
import { useState } from "react";
import { toast } from "sonner";

interface PromptTemplateProps {
  state: PromptState;
  setState: (value: PromptState) => void;
  stateKey: keyof States;
  fetchPrompt: () => void;
  form: Form;
  requiredPrompts?: PromptState[];
}

export default function PromptTemplate({
  state,
  setState,
  stateKey,
  fetchPrompt,
  form,
}: PromptTemplateProps) {
  const [disabled, setDisabled] = useState(false);

  const handleKey = async (
    state: PromptState,
    stateKey: keyof States,
    form: Form
  ) => {
    switch (stateKey) {
      case "title":
        if (!form.name)
          return toast.error("Nome do produto não pode ser vazio");
        break;
      case "metaDescription":
        if (!form.description)
          return toast.error("Descrição do produto não pode ser vazia");
        if (!form.price)
          return toast.error("Preço do produto não pode ser vazio");
        if (!form.rating)
          return toast.error("Avaliação do produto não pode ser vazia");
        if (!form.ordersAmount)
          return toast.error("Quantidade de pedidos não pode ser vazia");
        if (!form.reviewsAmount)
          return toast.error("Quantidade de reviews não pode ser vazia");
        break;
      case "pros":
        if (!form.price)
          return toast.error("Preço do produto não pode ser vazio");
        if (!form.description)
          return toast.error("Descrição do produto não pode ser vazia");
        break;
      case "cons":
        if (!form.price)
          return toast.error("Preço do produto não pode ser vazio");
        if (!form.description)
          return toast.error("Descrição do produto não pode ser vazia");
        break;
      case "customerExperience":
        if (!form.reviewsAmount)
          return toast.error("Quantidade de reviews não pode ser vazia");
        break;
      case "costBenefit":
        if (!form.price)
          return toast.error("Preço do produto não pode ser vazio");
        if (!form.description)
          return toast.error("Descrição do produto não pode ser vazia");
        break;
    }
    setDisabled(true);
    const response = await fetchServerAI(state.prompt, stateKey);
    console.log(response);
    setState({ ...state, response });
    setDisabled(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Label>Prompt de {stateKey}</Label>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Textarea
          placeholder={`Prompt de ${stateKey}`}
          className="h-52 bg-secondary"
          value={state.prompt}
          onChange={(e) =>
            setState({
              ...state,
              prompt: e.target.value,
            })
          }
          readOnly
        />
        <Label>Proposta de {stateKey}</Label>
        <Textarea
          placeholder={`Resposta de ${stateKey}`}
          className="h-52"
          value={state.response}
          onChange={(e) =>
            setState({
              ...state,
              response: e.target.value,
            })
          }
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant={"outline"} onClick={() => fetchPrompt()}>
          Load Prompt
        </Button>

        <Button
          disabled={disabled}
          onClick={() => handleKey(state, stateKey, form)}
        >
          Gerar {stateKey}{" "}
          {disabled && (
            <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
