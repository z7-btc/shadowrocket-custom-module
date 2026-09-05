function main(config) {
  // ==============================
  // 1. 自定义代理组
  // ==============================

  const customGroups = [
    {
      name: "CHATGPT",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(台湾|Taiwan|🇹🇼|日本|Japan|🇯🇵|新加坡|Singapore|🇸🇬|韩国|Korea|South Korea|🇰🇷|美国|USA|United States|🇺🇸|英国|United Kingdom|🇬🇧|加拿大|Canada|🇨🇦|澳大利亚|澳洲|Australia|🇦🇺|德国|Germany|🇩🇪|法国|France|🇫🇷|荷兰|Netherlands|🇳🇱)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },

    {
      name: "MEXC",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(台湾|Taiwan|🇹🇼|澳大利亚|澳洲|Australia|🇦🇺|新西兰|New Zealand|🇳🇿|泰国|Thailand|🇹🇭|越南|Vietnam|🇻🇳)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },

    {
      name: "BITGET",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(台湾|Taiwan|🇹🇼|韩国|Korea|South Korea|🇰🇷|英国|UK|United Kingdom|🇬🇧|澳大利亚|澳洲|Australia|🇦🇺|新西兰|New Zealand|🇳🇿|瑞士|Switzerland|🇨🇭)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },

    {
      name: "TALKTONE",
      type: "url-test",
      "include-all": true,

      // 必须同时满足：
      // 美国/加拿大/英国
      // +
      // 家宽/住宅/Residential
      filter:
        "(?i)(?:(?:美国|USA|United States|🇺🇸|加拿大|Canada|🇨🇦|英国|UK|United Kingdom|🇬🇧).*(?:家宽|住宅|Residential)|(?:家宽|住宅|Residential).*(?:美国|USA|United States|🇺🇸|加拿大|Canada|🇨🇦|英国|UK|United Kingdom|🇬🇧))",

      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    }
  ];

  // 删除可能已有的同名组，避免重复
  const customNames = new Set(customGroups.map(g => g.name));

  const oldGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"].filter(g => !customNames.has(g.name))
    : [];

  config["proxy-groups"] = [
    ...customGroups,
    ...oldGroups
  ];

  // ==============================
  // 2. GitHub 远程规则
  // ==============================

  config["rule-providers"] = config["rule-providers"] || {};

  const providers = {
    Z7_CHATGPT: "chatgpt.list",
    Z7_MEXC: "mexc.list",
    Z7_BITGET: "bitget.list",
    Z7_TALKTONE: "talkatone.list"
  };

  const base = "https://raw.githubusercontent.com/z7-btc/shadowrocket-custom-module/main/rules/";

  for (const [name, file] of Object.entries(providers)) {
    config["rule-providers"][name] = {
      type: "http",
      behavior: "domain",
      format: "text",
      url: base + file,
      interval: 86400
    };
  }

  // ==============================
  // 3. 把自定义规则插到最前面
  // ==============================

  const customRules = [
    "RULE-SET,Z7_CHATGPT,CHATGPT",
    "RULE-SET,Z7_MEXC,MEXC",
    "RULE-SET,Z7_BITGET,BITGET",
    "RULE-SET,Z7_TALKTONE,TALKTONE"
  ];

  config.rules = Array.isArray(config.rules)
    ? [...customRules, ...config.rules]
    : customRules;

  return config;
}
