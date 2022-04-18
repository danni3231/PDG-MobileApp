export const lineBreak = (text: string) => {
  return text.split("\\n");
};

export const parseHour = (date: number) => {
  const dateParser = new Date(date * 1000);
  return `${dateParser.getHours()}:${dateParser.getMinutes()}`;
};

export const goBack = (navigate: any) => {
  navigate(-1);
};
