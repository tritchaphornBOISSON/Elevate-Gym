import Image, { type StaticImageData } from "next/image";

export type EditorialImageProps =
  | {
      src: StaticImageData | string;
      alt: string;
      concept?: false;
      sizes: string;
      preload?: boolean;
      objectPosition?: string;
      className?: string;
    }
  | {
      src: null;
      alt: null;
      concept: true;
      sizes: string;
      className?: string;
    };

export function EditorialImage(props: EditorialImageProps) {
  const wrapperClassName = `relative isolate overflow-hidden bg-concept-surface ${props.className ?? ""}`;

  if (props.src === null) {
    return <div aria-hidden="true" className={wrapperClassName} />;
  }

  return (
    <div className={wrapperClassName}>
      <Image
        alt={props.alt}
        className="object-cover"
        fill
        preload={props.preload}
        sizes={props.sizes}
        src={props.src}
        style={
          props.objectPosition
            ? { objectPosition: props.objectPosition }
            : undefined
        }
      />
    </div>
  );
}
