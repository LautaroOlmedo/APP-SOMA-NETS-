export enum paymentMethod {
  CASH = 'CASH',

  CREDIT_CARD = 'CREDIT_CARD',

  TRANSACTION = 'TRANSACTION',
}

export enum transactionStatus {
  RELEASED = 'RELEASED',

  PENDING = 'PENDING',

  REJECTED = 'TREJECTED',
}

export enum size {
  S = 'S',

  L = 'L',

  M = 'M',

  small = 41,

  intermediate = 43,

  bigger = 45,
}

export enum talle {
  small = 41,
  intermediate = 43,
  bigger = 45,
}

export enum movement_in {
  inversion = 'INVERSION',
}

export enum wallet_type {
  payPal = 'PAYPAL',
  mercadoPago = 'Mercado Pago',
}

export enum wallet_tax {
  payPal_tax = 3,
  mercadoPago_tax = 4,
}
