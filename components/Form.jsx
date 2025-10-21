// ...existing code...
import { Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel, SelectContent } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Button from "./Button";
// ...existing code...

const Form = () => {
  return (
    <form className="flex flex-col">
      <div className="flex flex-col gap-[20px] mb-[20px]">
        <Input type="text" placeholder="Nome Completo" />
        <Input type="email" placeholder="Endereço de E-mail" />
        <div className="flex flex-col xl:flex-row gap-[20px]">
          <Input type="tel" placeholder="Telefone" />
          <Select>
            <SelectTrigger className="w-full rounded-none h-[54px] text-secondary outline-none">
              <SelectValue placeholder="Selecione um Serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecione um Serviço</SelectLabel>
                  <SelectItem value="auto">Automação de Processos</SelectItem>
                  <SelectItem value="dados">Análise de Dados</SelectItem>
                  <SelectItem value="dese">Desenvolvimento de Sistemas</SelectItem>
                  <SelectItem value="land">Criação de Páginase</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-6">
      <Textarea className="h-[180px] resize-nome rounded-none" placeholder="Entre com sua mensagem" rows={4} />
      
        <Button text="Enviar mensagem" />
      </div>
    </form>
  );
};

export default Form;
// ...existing code...