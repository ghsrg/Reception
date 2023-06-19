interface ISendMail {
  From?: string;
  To?:  string[];
  CC?: string[];
  Body?: string;
  Subject?: string;

}

export default ISendMail;
