import { NextRequest, NextResponse } from "next/server";
import pluginEstree from "prettier/plugins/estree";
import pluginTypescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const prettierCode = await prettier.format(code, {
        parser: "typescript",
        plugins: [pluginTypescript, pluginEstree],
        semi: true,
        tabWidth: 2
    });

    const formattedCode = prettierCode.trimEnd() || code;

    return NextResponse.json({ formattedCode });
  } catch (error) {
    console.error("Error formatting code with Prettier:", error);

    return NextResponse.json(
      { error: "Failed to format code" },
      { status: 500 }
    );
  }
}
