/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./page";

const signInWithOtpMock = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOtp: signInWithOtpMock,
    },
  }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

vi.mock("@/components/ui/background-beams-with-collision", () => ({
  BackgroundBeamsWithCollision: ({
    children,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div>{children}</div>,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form initially", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue with magic link/i })
    ).toBeInTheDocument();
  });

  it("shows the confirmation state after successful submit", async () => {
    signInWithOtpMock.mockResolvedValue({ error: null });

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "test@example.com");
    await user.click(
      screen.getByRole("button", { name: /continue with magic link/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/we sent a magic link to/i)
    ).toBeInTheDocument();

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("you@example.com")).not.toBeInTheDocument();
  });

  it("shows an error when sign-in fails", async () => {
    signInWithOtpMock.mockResolvedValue({
      error: { message: "Invalid login request" },
    });

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "test@example.com");
    await user.click(
      screen.getByRole("button", { name: /continue with magic link/i })
    );

    expect(
      await screen.findByText(/invalid login request/i)
    ).toBeInTheDocument();
  });
});