import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/tebeerr", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "ramzi-portfolio",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub profile" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      location: data.location,
      blog: data.blog,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "GitHub fetch failed", message: (e as Error).message },
      { status: 500 }
    );
  }
}
