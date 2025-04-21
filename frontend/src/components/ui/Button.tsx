import Link from "next/link";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  type?: ButtonType;
  value?: string;
  bgColor?: string;
  textColor?: string;
  classname?: string;
  icon?: React.ReactNode;
  method?: () => void;
  children?: React.ReactNode;
  variant?: boolean
  href?: string;
}

export default function Button({
  type = "button",
  value = "",
  bgColor = "bg-blue-500 hover:bg-blue-600",
  textColor = "text-white",
  classname = "",
  icon = undefined,
  method = undefined,
  children = undefined,
  variant = false,
  href = "#",
}: ButtonProps) {
  return (
    <>
      {
        variant
          ? (
            <Link
              href={href}
              className = {`${classname} w-auto ${textColor} font-roboto text-xl cursor-pointer block transition-colors duration-300 ${bgColor} shadow-md`}
            >
              { icon && <span>{icon}</span> }
              <p className={value ? "block" : "hidden"}>
                {value}
              </p>
              {children}
            </Link>
          )
          : (
            <button
              type = { type }
              value = { value }
              onClick = { method }
              className = {`${classname} w-auto ${textColor} font-roboto text-xl cursor-pointer block transition-colors duration-300 ${bgColor} shadow-md`}
            >
              { icon && <span>{icon}</span> }
              <p className={value ? "block" : "hidden"}>
                {value}
              </p>
              {children}
            </button >
          )
      }
    </>   
  );
}
