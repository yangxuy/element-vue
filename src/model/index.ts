interface Rule {
  required: boolean;
  validator: Function;
  trigger: string;
}

// rules
interface Rules {
  NotEmpty: Rule;
  number: Rule;
  date: Rule;

  [propName: string]: object;
}