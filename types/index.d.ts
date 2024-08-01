// types/index.d.ts

declare module 'google_news_link_decode' {
    /**
     * Decodes a Google News URL to return the original post link.
     * @param url - The Google News URL to decode.
     * @returns A promise that resolves to the decoded URL.
     */
    function decodeGoogleNewsUrl(url: string): Promise<string>;

    export default decodeGoogleNewsUrl;
}