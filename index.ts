/**
 * This magically uses batchexecute protocol. It's not documented, but it works.
 * 
 * Licensed under: MIT License
 *
 * Copyright (c) 2024 Ruslan Gainutdinov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const fetchDecodedBatchExecute = (id: string) => {
    const s =
      '[[["Fbv4je","[\\"garturlreq\\",[[\\"en-US\\",\\"US\\",[\\"FINANCE_TOP_INDICES\\",\\"WEB_TEST_1_0_0\\"],null,null,1,1,\\"US:en\\",null,180,null,null,null,null,null,0,null,null,[1608992183,723341000]],\\"en-US\\",\\"US\\",1,[2,3,4,8],1,0,\\"655000234\\",0,0,null,0],\\"' +
      id +
      '\\"]",null,"generic"]]]';
  
    return fetch("https://news.google.com/_/DotsSplashUi/data/batchexecute?" + "rpcids=Fbv4je", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Referrer: "https://news.google.com/"
      },
      body: "f.req=" + encodeURIComponent(s),
      method: "POST"
    })
      .then(e => e.text())
      .then(s => {
        const header = '[\\"garturlres\\",\\"';
        const footer = '\\",';
        if (!s.includes(header)) {
          throw new Error("header not found: " + s);
        }
        const start = s.substring(s.indexOf(header) + header.length);
        if (!start.includes(footer)) {
          throw new Error("footer not found");
        }
        const url = start.substring(0, start.indexOf(footer));
        return url;
      });
  };
  
  /**
   * Google News started generate encoded, internal URLs for RSS items
   * https://news.google.com/rss/search?q=New%20York%20when%3A30d&hl=en-US&gl=US&ceid=US:en
   *
   * This script decodes URLs into original one, for example URL
   * https://news.google.com/__i/rss/rd/articles/CBMiSGh0dHBzOi8vdGVjaGNydW5jaC5jb20vMjAyMi8xMC8yNy9uZXcteW9yay1wb3N0LWhhY2tlZC1vZmZlbnNpdmUtdHdlZXRzL9IBAA?oc=5
   *
   * contains this
   * https://techcrunch.com/2022/10/27/new-york-post-hacked-offensive-tweets/
   *
   * In path after articles/ goes Base64 encoded binary data
   *
   * Format is the following:
   * <prefix> <len bytes> <URL bytes> <len bytes> <amp URL bytes> [<suffix>]
   *
   * <prefix> - 0x08, 0x13, 0x22
   * <suffix> - 0xd2, 0x01, 0x00 (sometimes missing??)
   * <len bytes> - formatted as 0x40 or 0x81 0x01 sometimes
   *
   *
   * https://news.google.com/rss/articles/CBMiqwFBVV95cUxNMTRqdUZpNl9hQldXbGo2YVVLOGFQdkFLYldlMUxUVlNEaElsYjRRODVUMkF3R1RYdWxvT1NoVzdUYS0xSHg3eVdpTjdVODQ5cVJJLWt4dk9vZFBScVp2ZmpzQXZZRy1ncDM5c2tRbXBVVHVrQnpmMGVrQXNkQVItV3h4dVQ1V1BTbjhnM3k2ZUdPdnhVOFk1NmllNTZkdGJTbW9NX0k5U3E2Tkk?oc=5
   * https://news.google.com/rss/articles/CBMidkFVX3lxTFB1QmFsSi1Zc3dLQkpNLThKTXExWXBGWlE0eERJQ2hLRENIOFJzRTlsRnM1NS1Hc2FlbjdIMlZ3eWNQa0JqeVYzZGs1Y0hKaUtTUko2dmJabUtVMWZob0lNSFNCa3NLQ05ROGh4cVZfVTYyUDVxc2c?oc=5
   * https://news.google.com/rss/articles/CBMiqwFBVV95cUxNMTRqdUZpNl9hQldXbGo2YVVLOGFQdkFLYldlMUxUVlNEaElsYjRRODVUMkF3R1RYdWxvT1NoVzdUYS0xSHg3eVdpTjdVODQ5cVJJLWt4dk9vZFBScVp2ZmpzQXZZRy1ncDM5c2tRbXBVVHVrQnpmMGVrQXNkQVItV3h4dVQ1V1BTbjhnM3k2ZUdPdnhVOFk1NmllNTZkdGJTbW9NX0k5U3E2Tkk?oc=5
   *
   * FIXME: What will happen if URL more than 255 bytes??
   *
   * Licensed under: MIT License
   *
   * Copyright (c) 2022 Ruslan Gainutdinov
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included
   * in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  export const decodeGoogleNewsUrl = async (sourceUrl: string) => {
    const url = new URL(sourceUrl);
    const path = url.pathname.split("/");
    if (
      url.hostname === "news.google.com" &&
      path.length > 1 &&
      path[path.length - 2] === "articles"
    ) {
      const base64 = path[path.length - 1];
      let str = atob(base64);
  
      const prefix = Buffer.from([0x08, 0x13, 0x22]).toString("binary");
      if (str.startsWith(prefix)) {
        str = str.substring(prefix.length);
      }
  
      const suffix = Buffer.from([0xd2, 0x01, 0x00]).toString("binary");
      if (str.endsWith(suffix)) {
        str = str.substring(0, str.length - suffix.length);
      }
  
      // One or two bytes to skip
      const bytes = Uint8Array.from(str, c => c.charCodeAt(0));
      const len = bytes.at(0)!;
      if (len >= 0x80) {
        str = str.substring(2, len + 2);
      } else {
        str = str.substring(1, len + 1);
      }
  
      if (str.startsWith("AU_yqL")) {
        // New style encoding, introduced in July 2024. Not yet known how to decode offline.
        const url = await fetchDecodedBatchExecute(base64);
        return url;
      }
  
      return str;
    } else {
      return sourceUrl;
    }
  };

export default decodeGoogleNewsUrl;