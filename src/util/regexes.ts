const getRegexRes = (
  regex: RegExp,
  str?: string | null,
  index = 0,
): string | undefined => {
  if (!str) {
    return undefined;
  }
  const res = regex.exec(str);
  if (res && res.length > index) {
    return res[index];
  }
};

export const execCsrfRegex = (body: string) =>
  getRegexRes(/<input name="_csrf_token".+value="(.+)">/g, body, 1);

export const execPlausibleKeyRegex = (cookies?: string | null) =>
  getRegexRes(/_plausible_key=(.+?)(?=;)/, cookies, 1);

export const execApiKeyRegex = (body: string) =>
  getRegexRes(/<input .* name="api_key\[key\]" .* value="(.*)"/, body, 1);
