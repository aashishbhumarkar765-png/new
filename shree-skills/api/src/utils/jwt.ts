import jwt from "jsonwebtoken";

export function signToken(userId: string) {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret) as { userId: string };
}
