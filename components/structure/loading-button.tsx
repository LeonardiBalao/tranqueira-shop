"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface LoadingButtonProps {
  text: string;
  href?: string;
  loadingText?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  icon?: JSX.Element;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  loadingState: PromptState;
  setLoadingState: (state: PromptState) => void;
  action?: () => void;
}

export default function LoadingButton({
  text,
  href,
  loadingText,
  loadingState,
  setLoadingState,
  className,
  size,
  icon,
  variant,
  action,
}: LoadingButtonProps) {
  const router = useRouter();

  const handleSubmit = async () => {
    setLoadingState({ ...loadingState, loading: true });
    if (action) {
      await action();
      setLoadingState({ ...loadingState, loading: false });
    }
    if (href) {
      setTimeout(() => {
        router.push(href);
      }, 1000);
    }
  };

  if (loadingState.loading) {
    return (
      <Button
        className={`flex gap-4 ${
          className?.includes("w-full") ? "w-full" : "max-w-min"
        }`}
        variant={"outline"}
      >
        <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
        {loadingText}
      </Button>
    );
  } else {
    return (
      <Button
        className={`${
          !className?.includes("w-full") && "max-w-min"
        }  flex gap-2 ${className}`}
        onClick={handleSubmit}
        size={size !== undefined ? size : "default"}
        variant={variant}
      >
        {icon} {text}
      </Button>
    );
  }
}
