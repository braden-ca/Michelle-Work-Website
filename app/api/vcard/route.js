import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${siteConfig.name}`,
    `ORG:${siteConfig.company}`,
    `TITLE:${siteConfig.title}`,
    `TEL;TYPE=WORK,VOICE:${siteConfig.phone}`,
    `EMAIL:${siteConfig.email}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${firstName}-${lastName}.vcf"`,
    },
  });
}
