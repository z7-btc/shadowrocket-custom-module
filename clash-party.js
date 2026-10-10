// ==============================================================================
// Clash Party 覆写：自建精确规则 + 通用兜底规则（单一脚本版）
// ------------------------------------------------------------------------------
// 2026-10-10 起，原第三方脚本 convert.min.js（powerfullz 订阅转换）的内容已全部
// 收编进本脚本：通用代理组 32 个、规则集 12 个、规则 38 条、DNS/TUN/嗅探设置。
// 之后这条订阅只需本脚本（+ 全局的 Smart Core Override 负责把 url-test 组转 smart）。
//
// 规则从上往下匹配：自己的精确规则永远在最前，通用规则兜底；机场自带规则不保留
// （与旧链条一致：convert.min.js 本来就会把规则/代理组整体重建）。
//
// 注意：Clash Party 的「接管 DNS」「接管嗅探」开关与 TUN 设置会在所有脚本跑完后
// 再覆盖一遍 DNS/TUN/嗅探，属正常现象；脚本里保留这些设置是为了与旧链条行为
// 完全一致（如 prefer-h3、sniff 的 QUIC 端口这些只有脚本里才有的设置会保留下来）。
// ==============================================================================

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

  // ==============================
  // 3. 通用功能代理组（原第三方脚本 convert.min.js 生成，2026-10-10 收编进本脚本）
  //    地区组不在这里重复定义（用上面 1. 里自己的版本，同名会保留自己的），
  //    印度 / 马来西亚这两个地区组按自己的 include-all + filter 风格写。
  // ==============================

  const allProxyNames = Array.isArray(config.proxies)
    ? config.proxies.map(p => p.name)
    : [];

  const utilityGroups = [
    {
      name: "选择代理",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
      type: "select",
      proxies: [
        "自动选择",
        "故障转移",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "手动选择",
      icon: "https://cdn.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/select.png",
      type: "select",
      proxies: allProxyNames
    },
    {
      name: "静态资源",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cloudflare.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "AI服务",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png",
      type: "select",
      proxies: [
        "日本节点",
        "台湾节点",
        "新加坡节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "加密货币",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cryptocurrency_1.png",
      type: "select",
      proxies: [
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "金融服务",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Nasdaq.png",
      type: "select",
      proxies: [
        "DIRECT",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
      ]
    },
    {
      name: "苹果服务",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple_2.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "谷歌服务",
      icon: "https://cdn.jsdelivr.net/gh/Orz-3/mini@master/Color/Google.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "微软服务",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Microsoft_Copilot.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Xbox",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Xbox.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Github",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/GitHub.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "哔哩哔哩",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png",
      type: "select",
      proxies: ["DIRECT", "台湾节点", "香港节点"]
    },
    {
      name: "巴哈姆特",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png",
      type: "select",
      proxies: ["台湾节点", "手动选择", "DIRECT"]
    },
    {
      name: "Youtube",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png",
      type: "select",
      proxies: [
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Twitch",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitch.png",
      type: "select",
      proxies: [
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Netflix",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png",
      type: "select",
      proxies: [
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "TikTok",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png",
      type: "select",
      proxies: [
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Spotify",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png",
      type: "select",
      proxies: [
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Telegram",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Telegram.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "Twitter",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "新浪微博",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Weibo.png",
      type: "select",
      "include-all": true,
      proxies: [
        "DIRECT",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "选择代理",
        "手动选择",
      ]
    },
    {
      name: "Truth Social",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Truth_Social.png",
      type: "select",
      proxies: ["美国节点", "手动选择"]
    },
    {
      name: "E-Hentai",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Ehentai.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "PikPak网盘",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/PikPak.png",
      type: "select",
      proxies: [
        "选择代理",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
        "手动选择",
        "DIRECT",
      ]
    },
    {
      name: "搜狗输入法",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Sougou.png",
      type: "select",
      proxies: ["DIRECT", "REJECT"]
    },
    {
      name: "广告拦截",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AdBlack.png",
      type: "select",
      proxies: ["REJECT", "REJECT-DROP", "DIRECT"]
    },
    {
      name: "Final",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png",
      type: "select",
      proxies: ["选择代理", "DIRECT"]
    },
    {
      name: "自动选择",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      proxies: ["香港节点", "台湾节点", "新加坡节点", "日本节点", "美国节点", "英国节点", "德国节点", "印度节点", "马来西亚节点"]
    },
    {
      name: "故障转移",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Available_1.png",
      type: "fallback",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      proxies: [
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
      ]
    },
    {
      name: "印度节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/India.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "(?i)(印度|India|🇮🇳)"
    },
    {
      name: "马来西亚节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Malaysia.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "(?i)(马来西亚|马来|Malaysia|🇲🇾)"
    },
    {
      name: "GLOBAL",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
      type: "select",
      "include-all": true,
      proxies: [
        "选择代理",
        "手动选择",
        "静态资源",
        "AI服务",
        "加密货币",
        "金融服务",
        "苹果服务",
        "谷歌服务",
        "微软服务",
        "Xbox",
        "Github",
        "哔哩哔哩",
        "巴哈姆特",
        "Youtube",
        "Twitch",
        "Netflix",
        "TikTok",
        "Spotify",
        "Telegram",
        "Twitter",
        "新浪微博",
        "Truth Social",
        "E-Hentai",
        "PikPak网盘",
        "搜狗输入法",
        "广告拦截",
        "Final",
        "自动选择",
        "故障转移",
        "香港节点",
        "台湾节点",
        "新加坡节点",
        "日本节点",
        "美国节点",
        "英国节点",
        "德国节点",
        "印度节点",
        "马来西亚节点",
      ]
    },
  ];

  // 合并：自己的组在前，通用组在后；万一重名，保留自己的版本
  const customNames = new Set([
    ...regionGroups.map(g => g.name),
    ...businessGroups.map(g => g.name)
  ]);
  config["proxy-groups"] = [
    ...regionGroups,
    ...businessGroups,
    ...utilityGroups.filter(g => !customNames.has(g.name))
  ];

  // ==============================
  // 4. 规则集（rule-providers）：自己的 4 个 + 通用 12 个
  // ==============================

  config["rule-providers"] = config["rule-providers"] || {};

  const base = "https://raw.githubusercontent.com/z7-btc/shadowrocket-custom-module/main/rules/";
  const providers = {
    Z7_CHATGPT: "chatgpt.list",
    Z7_MEXC: "mexc.list",
    Z7_BITGET: "bitget.list",
    Z7_TALKTONE: "talkatone.list"
  };

  for (const [name, file] of Object.entries(providers)) {
    config["rule-providers"][name] = {
      type: "http",
      behavior: "domain",
      format: "text",
      url: base + file,
      interval: 86400
    };
  }

  const utilityProviders = {
    ADBlock: {
      type: "http",
      behavior: "domain",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.yaml",
      path: "./ruleset/ADBlock.yaml"
    },
    SogouInput: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://ruleset.skk.moe/Clash/non_ip/sogouinput.txt",
      path: "./ruleset/SogouInput.txt"
    },
    StaticResources: {
      type: "http",
      behavior: "domain",
      format: "text",
      interval: 86400,
      url: "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
      path: "./ruleset/StaticResources.txt"
    },
    CDNResources: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
      path: "./ruleset/CDNResources.txt"
    },
    TikTok: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/TikTok.list",
      path: "./ruleset/TikTok.list"
    },
    EHentai: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/EHentai.list",
      path: "./ruleset/EHentai.list"
    },
    SteamFix: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/SteamFix.list",
      path: "./ruleset/SteamFix.list"
    },
    GoogleFCM: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/FirebaseCloudMessaging.list",
      path: "./ruleset/FirebaseCloudMessaging.list"
    },
    AdditionalFilter: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/AdditionalFilter.list",
      path: "./ruleset/AdditionalFilter.list"
    },
    AdditionalCDNResources: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/AdditionalCDNResources.list",
      path: "./ruleset/AdditionalCDNResources.list"
    },
    Weibo: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/Weibo.list",
      path: "./ruleset/Weibo.list"
    },
    GFWList: {
      type: "http",
      behavior: "domain",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      path: "./ruleset/GFWList.yaml"
    },
  };

  Object.assign(config["rule-providers"], utilityProviders);

  // ==============================
  // 5. 规则（从上往下匹配，先到先得）
  //    自己的精确规则永远在最前；后面是通用规则；机场自带规则不保留
  // ==============================

  const customRules = [
    // Windows 联网体检域名（NCSI）必须走直连：
    // 否则会被后面的 StaticResources 规则丢给代理节点，体检失败后系统会把
    // Mihomo 虚拟网卡标记为"无法访问 Internet"。
    "DOMAIN-SUFFIX,msftconnecttest.com,DIRECT",
    "DOMAIN-SUFFIX,msftncsi.com,DIRECT",
    "RULE-SET,Z7_CHATGPT,CHATGPT",
    "RULE-SET,Z7_MEXC,MEXC",
    "RULE-SET,Z7_BITGET,BITGET",
    "RULE-SET,Z7_TALKTONE,TALKTONE"
  ];

  const utilityRules = [
    // 禁 QUIC（UDP 443）：避免部分网站走 QUIC 绕过分流
    "AND,((DST-PORT,443),(NETWORK,UDP)),REJECT",
    // 内网直连
    "GEOIP,private,DIRECT,no-resolve",
    // 广告拦截
    "RULE-SET,ADBlock,广告拦截",
    // 追加广告拦截
    "RULE-SET,AdditionalFilter,广告拦截",
    // 搜狗输入法
    "RULE-SET,SogouInput,搜狗输入法",
    // Truth Social
    "DOMAIN-SUFFIX,truthsocial.com,Truth Social",
    // 静态资源 / CDN
    "RULE-SET,StaticResources,静态资源",
    "RULE-SET,CDNResources,静态资源",
    "RULE-SET,AdditionalCDNResources,静态资源",
    // 加密货币 / 金融
    "GEOSITE,category-cryptocurrency,加密货币",
    "GEOSITE,category-finance,金融服务",
    // AI 服务兜底（精确的 Z7_CHATGPT 在最前面先匹配）
    "GEOSITE,category-ai-!cn,AI服务",
    // 流媒体 / 社交
    "GEOSITE,bilibili,哔哩哔哩",
    "GEOSITE,youtube,Youtube",
    "GEOSITE,telegram,Telegram",
    "GEOIP,telegram,Telegram,no-resolve",
    "GEOSITE,xbox,Xbox",
    "GEOSITE,github,Github",
    "GEOSITE,netflix,Netflix",
    "GEOSITE,twitch,Twitch",
    "GEOIP,netflix,Netflix,no-resolve",
    "GEOSITE,spotify,Spotify",
    "GEOSITE,bahamut,巴哈姆特",
    "GEOSITE,pikpak,PikPak网盘",
    "GEOSITE,twitter,Twitter",
    // 微博 / E-Hentai / TikTok
    "RULE-SET,Weibo,新浪微博",
    "RULE-SET,EHentai,E-Hentai",
    "RULE-SET,TikTok,TikTok",
    // Steam 修复 / Google FCM 直连
    "RULE-SET,SteamFix,DIRECT",
    "RULE-SET,GoogleFCM,DIRECT",
    // 国内版 Google Play / 微软 直连
    "GEOSITE,google-play@cn,DIRECT",
    "GEOSITE,microsoft@cn,DIRECT",
    // 苹果 / 微软 / 谷歌服务
    "GEOSITE,apple,苹果服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,google,谷歌服务",
    // GFWList → 代理
    "RULE-SET,GFWList,选择代理",
    // 国内 → 直连
    "GEOIP,cn,DIRECT",
    // 兜底
    "MATCH,Final"
  ];

  config.rules = [...customRules, ...utilityRules];

  // ==============================
  // 6. DNS / TUN / 嗅探 / geodata（原 convert.min.js 的内容，原样保留）
  //    这几段大部分会被 Clash Party 的客户端设置覆盖（见文件头说明），
  //    保留是为了让"脚本这一层"与旧链条完全等价。
  // ==============================

  config.sniffer = {
    sniff: {
      TLS: { ports: [443, 8443] },
      HTTP: { ports: [80, 8080, 8880] },
      QUIC: { ports: [443, 8443] }
    },
    "override-destination": false,
    enable: true,
    "force-dns-mapping": true,
    "skip-domain": ["Mijia Cloud", "dlg.io.mi.com", "+.push.apple.com"]
  };

  config.dns = {
    enable: true,
    ipv6: false,
    "prefer-h3": true,
    "enhanced-mode": "fake-ip",
    nameserver: ["system", "223.5.5.5", "119.29.29.29", "180.184.1.1"],
    fallback: [
        "quic://dns0.eu", "https://dns.cloudflare.com/dns-query", "https://dns.sb/dns-query",
        "tcp://208.67.222.222", "tcp://8.26.56.2"
      ],
    "fake-ip-filter": [
        "geosite:connectivity-check", "Mijia Cloud", "dig.io.mi.com", "localhost.ptlogin2.qq.com",
        "*.icloud.com", "*.stun.*.*", "*.stun.*.*.*", "*.lan",
        "*.localdomain", "*.example", "*.invalid", "*.localhost",
        "*.test", "*.local", "*.home.arpa", "time.*.com",
        "time.*.gov", "time.*.edu.cn", "time.*.apple.com", "time1.*.com",
        "time2.*.com", "time3.*.com", "time4.*.com", "time5.*.com",
        "time6.*.com", "time7.*.com", "ntp.*.com", "ntp1.*.com",
        "ntp2.*.com", "ntp3.*.com", "ntp4.*.com", "ntp5.*.com",
        "ntp6.*.com", "ntp7.*.com", "*.time.edu.cn", "*.ntp.org.cn",
        "+.pool.ntp.org", "time1.cloud.tencent.com", "stun.*.*", "stun.*.*.*",
        "swscan.apple.com", "mesu.apple.com", "music.163.com", "*.music.163.com",
        "*.126.net", "musicapi.taihe.com", "music.taihe.com", "songsearch.kugou.com",
        "trackercdn.kugou.com", "*.kuwo.cn", "api-jooxtt.sanook.com", "api.joox.com",
        "y.qq.com", "*.y.qq.com", "streamoc.music.tc.qq.com", "mobileoc.music.tc.qq.com",
        "isure.stream.qqmusic.qq.com", "dl.stream.qqmusic.qq.com", "aqqmusic.tc.qq.com", "amobile.music.tc.qq.com",
        "localhost.ptlogin2.qq.com", "*.msftconnecttest.com", "*.msftncsi.com", "*.xiami.com",
        "*.music.migu.cn", "music.migu.cn", "+.wotgame.cn", "+.wggames.cn",
        "+.wowsgame.cn", "+.wargaming.net", "*.*.*.srv.nintendo.net", "*.*.stun.playstation.net",
        "xbox.*.*.microsoft.com", "*.*.xboxlive.com", "*.ipv6.microsoft.com", "teredo.*.*.*",
        "teredo.*.*", "speedtest.cros.wr.pvp.net", "+.jjvip8.com", "www.douyu.com",
        "activityapi.huya.com", "activityapi.huya.com.w.cdngslb.com", "www.bilibili.com", "api.bilibili.com",
        "a.w.bilicdn1.com", "+.apt-agent.com"
      ]
  };

  config.tun = {
    enable: false,
    stack: "gvisor",
    device: "mihomo",
    "route-exclude-address": ["100.64.0.0/10", "fd7a:115c:a1e0::/48", "192.168.0.0/16"],
    "dns-hijack": ["any:53"],
    mtu: 1500
  };

  config["geodata-mode"] = true;
  config["geox-url"] = {
    geoip: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    geosite: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    mmdb: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    asn: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"
  };

  return config;
}
