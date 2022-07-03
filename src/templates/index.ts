import Mustache from 'mustache';
import { readFileSync } from 'fs';
import path from 'path';

type TemplateArgs = {
  example: { images: { url: string }[] };
};

const templates: { [key in keyof TemplateArgs]: string } = {
  example: readFileSync(path.resolve(__dirname, 'example.mustache'), 'utf8'),
};

export function renderTemplate<T extends keyof TemplateArgs>(templateName: T, args: TemplateArgs[T]) {
  return Mustache.render(templates[templateName], args);
}
