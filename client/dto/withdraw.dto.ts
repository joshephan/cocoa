import { z } from 'zod'

// Exchange type
export const ExchangeEnum = z.enum(['upbit', 'binance', 'bithumb'])
export type Exchange = z.infer<typeof ExchangeEnum>

// Query parameters schema
export const WithdrawPathQuerySchema = z.object({
  amount: z.number().positive(),
  from: ExchangeEnum,
  to: ExchangeEnum,
})

// Response schema
export const WithdrawPathResultSchema = z.object({
  coin: z.string(),
  fromExchange: z.string(),
  toExchange: z.string(),
  amount: z.number(),
  withdrawFee: z.number(),
  estimatedReceiveAmount: z.number(),
  feeInKRW: z.number(),
  exchangeRate: z.number(),
  steps: z.array(z.string()),
  profitRate: z.number(),
  sourceAmountInKRW: z.number().optional(),
  targetAmountInKRW: z.number(),
  fromPrice: z.number(),
  toPrice: z.number(),
})

// Error schema
export const WithdrawErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
})

// Response wrapper schema
export const WithdrawResponseSchema = z.object({
  success: z.boolean(),
  data: WithdrawPathResultSchema,
  error: z.object({
    message: z.string(),
    status: z.number(),
  }).optional(),
})

// Infer types from schemas
export type WithdrawPathQuery = z.infer<typeof WithdrawPathQuerySchema>
export type WithdrawPathResult = z.infer<typeof WithdrawPathResultSchema>
export type WithdrawError = z.infer<typeof WithdrawErrorSchema>
export type WithdrawResponse = z.infer<typeof WithdrawResponseSchema>

// Constants
export const KOREA_EXCHANGES = [
  { value: "upbit", label: "업비트", image: true },
  { value: "bithumb", label: "빗썸", image: true },
] as const;

export const GLOBAL_EXCHANGES = [
  { value: "binance", label: "바이낸스", image: true },
] as const;

// Helper functions
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

export function formatCrypto(amount: number, decimals = 8): string {
 
  if (amount === 0) return '0';
  if (isNaN(amount)) return '0';
  if (amount === null) return '0';
  
  return amount.toFixed(decimals)
}

// Validation functions
export function validateAmount(amount: string): boolean {
  const num = Number(amount)
  return !isNaN(num) && num > 0
}

export function validateExchangePair(from: Exchange, to: Exchange): boolean {
  if (from === to) return false
  return true
} 