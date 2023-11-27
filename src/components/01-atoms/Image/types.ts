export type ImageRatioTypes = "1:1" | "16:9";

export type ImageVariantTypes = "normal" | "rounded" | "circle";

export type ImagePropTypes = {
  src: string;
  alt: string;
  ratio?: ImageRatioTypes;
  variant?: ImageVariantTypes;
};

export type StyledWrapperPropTypes = {
  ratio: ImageRatioTypes;
};

export type StyledImagePropTypes = {
  variant: ImageVariantTypes;
};
