function main(config) {
  // ==============================
  // 1. 地区代理组（第一层：url-test 智能组）
  //    每个国家一个，内部自动测速挑最快节点
  //    开启 Smart Group 后会显示成  "日本节点(Smart Group)"
  // ==============================

  const regionGroups = [
    {
      name: "香港节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(香港|Hong Kong|🇭🇰)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "台湾节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(台湾|Taiwan|🇹🇼)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "日本节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(日本|Japan|🇯🇵)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "新加坡节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(新加坡|Singapore|🇸🇬)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "韩国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(韩国|Korea|South Korea|🇰🇷)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "美国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(美国|USA|United States|🇺🇸)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "英国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(英国|United Kingdom|UK|🇬🇧)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "加拿大节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(加拿大|Canada|🇨🇦)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "澳大利亚节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(澳大利亚|澳洲|Australia|🇦🇺)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "新西兰节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(新西兰|New Zealand|🇳🇿)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "德国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(德国|Germany|🇩🇪)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "法国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(法国|France|🇫🇷)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "荷兰节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(荷兰|Netherlands|🇳🇱)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "泰国节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(泰国|Thailand|🇹🇭)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "越南节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(越南|Vietnam|🇻🇳)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "瑞士节点",
      type: "url-test",
      "include-all": true,
      filter: "(?i)(瑞士|Switzerland|🇨🇭)",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },

    // ---- 住宅节点（专门给 TALKTONE 等需要家宽 IP 的场景）----
    {
      name: "美国住宅节点",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(?:(?:美国|USA|United States|🇺🇸).*(?:家宽|住宅|Residential|Home|家庭)|(?:家宽|住宅|Residential|Home|家庭).*(?:美国|USA|United States|🇺🇸))",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "加拿大住宅节点",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(?:(?:加拿大|Canada|🇨🇦).*(?:家宽|住宅|Residential|Home|家庭)|(?:家宽|住宅|Residential|Home|家庭).*(?:加拿大|Canada|🇨🇦))",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    },
    {
      name: "英国住宅节点",
      type: "url-test",
      "include-all": true,
      filter:
        "(?i)(?:(?:英国|United Kingdom|UK|🇬🇧).*(?:家宽|住宅|Residential|Home|家庭)|(?:家宽|住宅|Residential|Home|家庭).*(?:英国|United Kingdom|UK|🇬🇧))",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 600,
      tolerance: 50,
      lazy: false
    }
  ];

  // ==============================
  // 2. 业务代理组（第二层：select 选择组）
  //    引用上面的国家组，由用户手动决定用哪些国家
  // ==============================

  const businessGroups = [
    {
      name: "CHATGPT",
      type: "select",
      proxies: [
        "日本节点",
        "台湾节点",
        "新加坡节点",
        "韩国节点",
        "美国节点",
        "英国节点",
        "加拿大节点",
        "澳大利亚节点",
        "德国节点",
        "法国节点",
        "荷兰节点"
      ]
    },
    {
      name: "MEXC",
      type: "select",
      proxies: [
        "台湾节点",
        "澳大利亚节点",
        "新西兰节点",
        "泰国节点",
        "越南节点"
      ]
    },
    {
      name: "BITGET",
      type: "select",
      proxies: [
        "台湾节点",
        "韩国节点",
        "英国节点",
        "澳大利亚节点",
        "新西兰节点",
        "瑞士节点"
      ]
    },
    {
      name: "TALKTONE",
      type: "select",
      proxies: [
        "美国住宅节点",
        "加拿大住宅节点",
        "英国住宅节点"
      ]
    }
  ];

  // 合并并去重：保留机场原始组，剔除我们重写的同名组
  const customNames = new Set([
    ...regionGroups.map(g => g.name),
    ...businessGroups.map(g => g.name)
  ]);

  const oldGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"].filter(g => !customNames.has(g.name))
    : [];

  config["proxy-groups"] = [
    ...regionGroups,
    ...businessGroups,
    ...oldGroups
  ];

  // ==============================
  // 3. GitHub 远程规则
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
  // 4. 把自定义规则插到最前面
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