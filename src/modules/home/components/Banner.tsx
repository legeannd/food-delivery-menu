import Image, { ImageProps } from "next/image";

export const Banner = (props: ImageProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative flex  w-full md:w-3xl  h-auto max-h-40 border-t border-t-white">
        <Image
          {...props}
          src={props.src}
          alt={props.alt}
          width={1000}
          height={400}
        />
      </div>
    </div>
  );
};
