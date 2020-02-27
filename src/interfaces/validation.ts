export interface ValidationResult {
  valid: Boolean,
  errors: Object
}

export interface SchemaErrorCheckResult {
  [key: string]: any | {
    param1: number[];
    param2: string; 
    param3: string;
}
}
