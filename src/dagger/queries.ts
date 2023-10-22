import { gql } from "../../deps.ts";

export const phpcs = gql`
  query phpcs($src: String!) {
    phpcs(src: $src)
  }
`;

export const phpstan = gql`
  query phpstan($src: String!) {
    phpstan(src: $src)
  }
`;

export const twigLint = gql`
  query twigLint($src: String!) {
    twigLint(src: $src)
  }
`;

export const xliffLint = gql`
  query xliffLint($src: String!) {
    xliffLint(src: $src)
  }
`;

export const yamlLint = gql`
  query yamlLint($src: String!) {
    yamlLint(src: $src)
  }
`;

export const doctrineLint = gql`
  query doctrineLint($src: String!) {
    doctrineLint(src: $src)
  }
`;

export const containerLint = gql`
  query containerLint($src: String!) {
    containerLint(src: $src)
  }
`;

export const phpUnit = gql`
  query phpUnit($src: String!) {
    phpUnit(src: $src)
  }
`;
