import React, { useState, useEffect } from 'react';

export default function DocenteForm({ onSaveDocente, docenteToEdit, cancelEdit }) {
  // Grupo 1: Dados Pessoais (useState individual por campo)
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [formacao, setFormacao] = useState('');

  // Grupo 2: Contatos
  const [emailInst, setEmailInst] = useState('');
  const [emailPart, setEmailPart] = useState('');
  const [celular, setCelular] = useState('');

  // Grupo 3: Endereço
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');

  // Erros de validação
  const [errors, setErrors] = useState({});

  // Lista de UFs para o Select
  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Carrega dados para alteração quando docenteToEdit muda
  useEffect(() => {
    if (docenteToEdit) {
      setNome(docenteToEdit.nome || '');
      setCpf(docenteToEdit.cpf || '');
      setFormacao(docenteToEdit.formacao || '');
      setEmailInst(docenteToEdit.emailInst || '');
      setEmailPart(docenteToEdit.emailPart || '');
      setCelular(docenteToEdit.celular || '');
      setEndereco(docenteToEdit.endereco || '');
      setNumero(docenteToEdit.numero || '');
      setCidade(docenteToEdit.cidade || '');
      setCep(docenteToEdit.cep || '');
      setUf(docenteToEdit.uf || '');
    }
  }, [docenteToEdit]);

  // Funções para máscaras de entrada
  const maskCPF = (val) => {
    return val
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')       .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const maskCelular = (val) => {
    return val
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const maskCEP = (val) => {
    return val
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  // Função de Validação
  const validar = () => {
    const errs = {};

    // Grupo 1
    if (!nome || nome.length < 3) errs.nome = 'Nome completo deve ter no mínimo 3 caracteres.';
    if (!cpf || cpf.length < 14) errs.cpf = 'CPF é obrigatório e deve ter formato válido.';
    if (!formacao.trim()) errs.formacao = 'Formação/Área de atuação é obrigatória.';

    // Grupo 2
    if (!emailInst || !emailInst.includes('@')) errs.emailInst = 'Email institucional válido é obrigatório.';
    if (emailPart && !emailPart.includes('@')) errs.emailPart = 'Email particular deve conter "@".';
    if (!celular || celular.length < 14) errs.celular = 'Telefone celular válido é obrigatório.';

    // Grupo 3
    if (!endereco.trim()) errs.endereco = 'Endereço é obrigatório.';
    if (!numero.trim()) errs.numero = 'Número é obrigatório.';
    if (!cidade.trim()) errs.cidade = 'Cidade é obrigatória.';
    if (!cep || cep.length < 9) errs.cep = 'CEP é obrigatório.';
    if (!uf) errs.uf = 'Selecione uma UF.';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validar();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const docenteData = {
      id: docenteToEdit ? docenteToEdit.id : Date.now(),
      nome, cpf, formacao,
      emailInst, emailPart, celular,
      endereco, numero, cidade, cep, uf
    };

    onSaveDocente(docenteData);
  };

  return (
    <div className="container my-4" style={{ maxWidth: '800px' }}>
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4 text-center">
          {docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* GRUPO 1: DADOS PESSOAIS */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="float-none w-auto px-2 h5 text-primary">Dados Pessoais</legend>
            <div className="mb-3">
              <label className="form-label">Nome Completo *</label>
              <input 
                type="text" 
                className={`form-control ${errors.nome ? 'is-invalid' : ''}`} 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
              />
              {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">CPF *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.cpf ? 'is-invalid' : ''}`} 
                  value={cpf} 
                  onChange={(e) => setCpf(maskCPF(e.target.value))} 
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Formação / Área de Atuação *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.formacao ? 'is-invalid' : ''}`} 
                  value={formacao} 
                  onChange={(e) => setFormacao(e.target.value)} 
                />
                {errors.formacao && <div className="invalid-feedback">{errors.formacao}</div>}
              </div>
            </div>
          </fieldset>

          {/* GRUPO 2: CONTATOS */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="float-none w-auto px-2 h5 text-primary">Contatos</legend>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email Institucional *</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.emailInst ? 'is-invalid' : ''}`} 
                  value={emailInst} 
                  onChange={(e) => setEmailInst(e.target.value)} 
                />
                {errors.emailInst && <div className="invalid-feedback">{errors.emailInst}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email Particular (Opcional)</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.emailPart ? 'is-invalid' : ''}`} 
                  value={emailPart} 
                  onChange={(e) => setEmailPart(e.target.value)} 
                />
                {errors.emailPart && <div className="invalid-feedback">{errors.emailPart}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Telefone Celular *</label>
              <input 
                type="tel" 
                className={`form-control ${errors.celular ? 'is-invalid' : ''}`} 
                value={celular} 
                onChange={(e) => setCelular(maskCelular(e.target.value))} 
                placeholder="(00) 00000-0000"
              />
              {errors.celular && <div className="invalid-feedback">{errors.celular}</div>}
            </div>
          </fieldset>

          {/* GRUPO 3: ENDEREÇO */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="float-none w-auto px-2 h5 text-primary">Endereço</legend>
            <div className="row">
              <div className="col-md-9 mb-3">
                <label className="form-label">Endereço Residencial *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.endereco ? 'is-invalid' : ''}`} 
                  value={endereco} 
                  onChange={(e) => setEndereco(e.target.value)} 
                />
                {errors.endereco && <div className="invalid-feedback">{errors.endereco}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Número *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.numero ? 'is-invalid' : ''}`} 
                  value={numero} 
                  onChange={(e) => setNumero(e.target.value)} 
                />
                {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label className="form-label">Cidade *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.cidade ? 'is-invalid' : ''}`} 
                  value={cidade} 
                  onChange={(e) => setCidade(e.target.value)} 
                />
                {errors.cidade && <div className="invalid-feedback">{errors.cidade}</div>}
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">CEP *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.cep ? 'is-invalid' : ''}`} 
                  value={cep} 
                  onChange={(e) => setCep(maskCEP(e.target.value))} 
                  placeholder="00000-000"
                />
                {errors.cep && <div className="invalid-feedback">{errors.cep}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">UF *</label>
                <select 
                  className={`form-select ${errors.uf ? 'is-invalid' : ''}`} 
                  value={uf} 
                  onChange={(e) => setUf(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {ufs.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                {errors.uf && <div className="invalid-feedback">{errors.uf}</div>}
              </div>
            </div>
          </fieldset>

          <div className="d-flex justify-content-end gap-2">
            {docenteToEdit && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {docenteToEdit ? 'Salvar Alterações' : 'Cadastrar Docente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}