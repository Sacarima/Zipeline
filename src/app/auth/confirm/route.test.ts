import { beforeEach, describe, expect, it, vi } from "vitest";

const verifyOtpMock = vi.fn();

describe("GET /auth/confirm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("redirects to /login when token_hash is missing", async () => {
    const { GET } = await import("./route");

    const request = new Request("http://localhost:3000/auth/confirm?type=email");

    const response = await GET(request as never);

    expect(response.headers.get("location")).toContain("/login");
  });

  it("redirects to /login when verifyOtp fails", async () => {
    vi.doMock("@/lib/supabase/server", () => ({
      createClient: () =>
        Promise.resolve({
          auth: {
            verifyOtp: verifyOtpMock,
          },
        }),
    }));

    verifyOtpMock.mockResolvedValue({ error: { message: "Invalid token" } });

    const { GET } = await import("./route");

    const request = new Request(
      "http://localhost:3000/auth/confirm?token_hash=abc&type=email"
    );

    const response = await GET(request as never);

    expect(response.headers.get("location")).toContain("/login");
  });

  it("redirects to /dashboard when verifyOtp succeeds", async () => {
    vi.doMock("@/lib/supabase/server", () => ({
      createClient: () =>
        Promise.resolve({
          auth: {
            verifyOtp: verifyOtpMock,
          },
        }),
    }));

    verifyOtpMock.mockResolvedValue({ error: null });

    const { GET } = await import("./route");

    const request = new Request(
      "http://localhost:3000/auth/confirm?token_hash=abc&type=email"
    );

    const response = await GET(request as never);

    expect(response.headers.get("location")).toContain("/dashboard");
  });
});