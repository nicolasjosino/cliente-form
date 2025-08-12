export interface Country {
  code: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: 'BR', name: 'Brasil' },
  { code: 'PT', name: 'Portugal' },
  { code: 'AO', name: 'Angola' },
  { code: 'MZ', name: 'Moçambique' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'GW', name: 'Guiné-Bissau' },
  { code: 'ST', name: 'São Tomé e Príncipe' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'GQ', name: 'Guiné Equatorial' }
];

export interface State {
  code: string;
  name: string;
  countryCode: string;
}

export const STATES: State[] = [
  // Brasil
  { code: 'AC', name: 'Acre', countryCode: 'BR' },
  { code: 'AL', name: 'Alagoas', countryCode: 'BR' },
  { code: 'AP', name: 'Amapá', countryCode: 'BR' },
  { code: 'AM', name: 'Amazonas', countryCode: 'BR' },
  { code: 'BA', name: 'Bahia', countryCode: 'BR' },
  { code: 'CE', name: 'Ceará', countryCode: 'BR' },
  { code: 'DF', name: 'Distrito Federal', countryCode: 'BR' },
  { code: 'ES', name: 'Espírito Santo', countryCode: 'BR' },
  { code: 'GO', name: 'Goiás', countryCode: 'BR' },
  { code: 'MA', name: 'Maranhão', countryCode: 'BR' },
  { code: 'MT', name: 'Mato Grosso', countryCode: 'BR' },
  { code: 'MS', name: 'Mato Grosso do Sul', countryCode: 'BR' },
  { code: 'MG', name: 'Minas Gerais', countryCode: 'BR' },
  { code: 'PA', name: 'Pará', countryCode: 'BR' },
  { code: 'PB', name: 'Paraíba', countryCode: 'BR' },
  { code: 'PR', name: 'Paraná', countryCode: 'BR' },
  { code: 'PE', name: 'Pernambuco', countryCode: 'BR' },
  { code: 'PI', name: 'Piauí', countryCode: 'BR' },
  { code: 'RJ', name: 'Rio de Janeiro', countryCode: 'BR' },
  { code: 'RN', name: 'Rio Grande do Norte', countryCode: 'BR' },
  { code: 'RS', name: 'Rio Grande do Sul', countryCode: 'BR' },
  { code: 'RO', name: 'Rondônia', countryCode: 'BR' },
  { code: 'RR', name: 'Roraima', countryCode: 'BR' },
  { code: 'SC', name: 'Santa Catarina', countryCode: 'BR' },
  { code: 'SP', name: 'São Paulo', countryCode: 'BR' },
  { code: 'SE', name: 'Sergipe', countryCode: 'BR' },
  { code: 'TO', name: 'Tocantins', countryCode: 'BR' },

  // Portugal (principais)
  { code: 'LX', name: 'Lisboa', countryCode: 'PT' },
  { code: 'PRT', name: 'Porto', countryCode: 'PT' },
  { code: 'STB', name: 'Setúbal', countryCode: 'PT' },
  { code: 'BRG', name: 'Braga', countryCode: 'PT' },
  { code: 'COI', name: 'Coimbra', countryCode: 'PT' },

  // Angola (principais)
  { code: 'LUA', name: 'Luanda', countryCode: 'AO' },
  { code: 'HUA', name: 'Huambo', countryCode: 'AO' },
  { code: 'BEN', name: 'Benguela', countryCode: 'AO' },

  // Moçambique (principais)
  { code: 'MPM', name: 'Maputo', countryCode: 'MZ' },
  { code: 'BEI', name: 'Beira', countryCode: 'MZ' },
  { code: 'NPL', name: 'Nampula', countryCode: 'MZ' },

  // Cabo Verde (principais)
  { code: 'SVD', name: 'São Vicente', countryCode: 'CV' },
  { code: 'STC', name: 'Santiago', countryCode: 'CV' },

  // Guiné-Bissau (principais)
  { code: 'BIS', name: 'Bissau', countryCode: 'GW' },

  // São Tomé e Príncipe (principais)
  { code: 'ST', name: 'São Tomé', countryCode: 'ST' },

  // Timor-Leste (principais)
  { code: 'DIL', name: 'Díli', countryCode: 'TL' },

  // Guiné Equatorial (principais)
  { code: 'BN', name: 'Bioko Norte', countryCode: 'GQ' },
  { code: 'BS', name: 'Bioko Sul', countryCode: 'GQ' }
];
