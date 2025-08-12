export interface State {
  code: string;
  name: string;
  countryCode: string;
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

const RAW_COUNTRIES = [
  { code: 'BR', name: 'Brasil' },
  { code: 'PT', name: 'Portugal' },
  { code: 'AO', name: 'Angola' },
  { code: 'MZ', name: 'Moçambique' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'GW', name: 'Guiné-Bissau' },
  { code: 'ST', name: 'São Tomé e Príncipe' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'GQ', name: 'Guiné Equatorial' },
];

const RAW_STATES: State[] = [
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

  // Portugal (Distritos)
  { code: 'AVE', name: 'Aveiro', countryCode: 'PT' },
  { code: 'BEJ', name: 'Beja', countryCode: 'PT' },
  { code: 'BRG', name: 'Braga', countryCode: 'PT' },
  { code: 'BRA', name: 'Bragança', countryCode: 'PT' },
  { code: 'CAS', name: 'Castelo Branco', countryCode: 'PT' },
  { code: 'COI', name: 'Coimbra', countryCode: 'PT' },
  { code: 'EVO', name: 'Évora', countryCode: 'PT' },
  { code: 'FAR', name: 'Faro', countryCode: 'PT' },
  { code: 'GUA', name: 'Guarda', countryCode: 'PT' },
  { code: 'LEI', name: 'Leiria', countryCode: 'PT' },
  { code: 'LIS', name: 'Lisboa', countryCode: 'PT' },
  { code: 'POR', name: 'Portalegre', countryCode: 'PT' },
  { code: 'PRT', name: 'Porto', countryCode: 'PT' },
  { code: 'SBA', name: 'Santarém', countryCode: 'PT' },
  { code: 'SET', name: 'Setúbal', countryCode: 'PT' },
  { code: 'VIA', name: 'Viana do Castelo', countryCode: 'PT' },
  { code: 'VIL', name: 'Vila Real', countryCode: 'PT' },
  { code: 'VIS', name: 'Viseu', countryCode: 'PT' },
  { code: 'ACO', name: 'Açores', countryCode: 'PT' },
  { code: 'MAD', name: 'Madeira', countryCode: 'PT' },

  // Angola (Províncias)
  { code: 'BGO', name: 'Bengo', countryCode: 'AO' },
  { code: 'BGU', name: 'Benguela', countryCode: 'AO' },
  { code: 'BIE', name: 'Bié', countryCode: 'AO' },
  { code: 'CAB', name: 'Cabinda', countryCode: 'AO' },
  { code: 'CCU', name: 'Cuando Cubango', countryCode: 'AO' },
  { code: 'CNO', name: 'Cuanza Norte', countryCode: 'AO' },
  { code: 'CUS', name: 'Cuanza Sul', countryCode: 'AO' },
  { code: 'CNN', name: 'Cunene', countryCode: 'AO' },
  { code: 'HUA', name: 'Huambo', countryCode: 'AO' },
  { code: 'HUI', name: 'Huíla', countryCode: 'AO' },
  { code: 'LUA', name: 'Luanda', countryCode: 'AO' },
  { code: 'LNO', name: 'Lunda Norte', countryCode: 'AO' },
  { code: 'LSU', name: 'Lunda Sul', countryCode: 'AO' },
  { code: 'MAL', name: 'Malanje', countryCode: 'AO' },
  { code: 'MOX', name: 'Moxico', countryCode: 'AO' },
  { code: 'NAM', name: 'Namibe', countryCode: 'AO' },
  { code: 'UIG', name: 'Uíge', countryCode: 'AO' },
  { code: 'ZAI', name: 'Zaire', countryCode: 'AO' },

  // Moçambique (Províncias)
  { code: 'MPM', name: 'Maputo (cidade)', countryCode: 'MZ' },
  { code: 'MAP', name: 'Maputo (província)', countryCode: 'MZ' },
  { code: 'GZA', name: 'Gaza', countryCode: 'MZ' },
  { code: 'INH', name: 'Inhambane', countryCode: 'MZ' },
  { code: 'MAN', name: 'Manica', countryCode: 'MZ' },
  { code: 'SOF', name: 'Sofala', countryCode: 'MZ' },
  { code: 'TE', name: 'Tete', countryCode: 'MZ' },
  { code: 'CAB', name: 'Cabo Delgado', countryCode: 'MZ' },
  { code: 'NIA', name: 'Nampula', countryCode: 'MZ' },
  { code: 'NIA', name: 'Niassa', countryCode: 'MZ' },
  { code: 'ZAM', name: 'Zambézia', countryCode: 'MZ' },

  // Cabo Verde (Ilhas)
  { code: 'BV', name: 'Boa Vista', countryCode: 'CV' },
  { code: 'BR', name: 'Brava', countryCode: 'CV' },
  { code: 'FO', name: 'Fogo', countryCode: 'CV' },
  { code: 'MA', name: 'Maio', countryCode: 'CV' },
  { code: 'PA', name: 'Paul', countryCode: 'CV' },
  { code: 'PN', name: 'Porto Novo', countryCode: 'CV' },
  { code: 'PR', name: 'Praia', countryCode: 'CV' },
  { code: 'RG', name: 'Ribeira Grande', countryCode: 'CV' },
  { code: 'SL', name: 'Sal', countryCode: 'CV' },
  { code: 'SN', name: 'São Nicolau', countryCode: 'CV' },
  { code: 'SV', name: 'São Vicente', countryCode: 'CV' },
  { code: 'ST', name: 'Santiago', countryCode: 'CV' },
  { code: 'TA', name: 'Tarrafal', countryCode: 'CV' },

  // Guiné-Bissau (Regiões)
  { code: 'BS', name: 'Bissau', countryCode: 'GW' },
  { code: 'BA', name: 'Bafatá', countryCode: 'GW' },
  { code: 'BM', name: 'Biombo', countryCode: 'GW' },
  { code: 'BL', name: 'Bolama', countryCode: 'GW' },
  { code: 'CA', name: 'Cacheu', countryCode: 'GW' },
  { code: 'GA', name: 'Gabú', countryCode: 'GW' },
  { code: 'OI', name: 'Oio', countryCode: 'GW' },
  { code: 'QU', name: 'Quinara', countryCode: 'GW' },
  { code: 'TO', name: 'Tombali', countryCode: 'GW' },

  // São Tomé e Príncipe (Distritos)
  { code: 'ST', name: 'São Tomé', countryCode: 'ST' },
  { code: 'PR', name: 'Príncipe', countryCode: 'ST' },

  // Timor-Leste (Municipalidades)
  { code: 'AL', name: 'Aileu', countryCode: 'TL' },
  { code: 'AN', name: 'Ainaro', countryCode: 'TL' },
  { code: 'BA', name: 'Baucau', countryCode: 'TL' },
  { code: 'BO', name: 'Bobonaro', countryCode: 'TL' },
  { code: 'CO', name: 'Cova Lima', countryCode: 'TL' },
  { code: 'DI', name: 'Díli', countryCode: 'TL' },
  { code: 'ER', name: 'Ermera', countryCode: 'TL' },
  { code: 'LA', name: 'Lautém', countryCode: 'TL' },
  { code: 'LI', name: 'Liquiçá', countryCode: 'TL' },
  { code: 'MF', name: 'Manufahi', countryCode: 'TL' },
  { code: 'MT', name: 'Manatuto', countryCode: 'TL' },
  { code: 'OE', name: 'Oecusse', countryCode: 'TL' },
  { code: 'VI', name: 'Viqueque', countryCode: 'TL' },

  // Guiné Equatorial (Provincias)
  { code: 'AN', name: 'Annobón', countryCode: 'GQ' },
  { code: 'BN', name: 'Bioko Norte', countryCode: 'GQ' },
  { code: 'BS', name: 'Bioko Sul', countryCode: 'GQ' },
  { code: 'CS', name: 'Centro Sur', countryCode: 'GQ' },
  { code: 'KN', name: 'Kié-Ntem', countryCode: 'GQ' },
  { code: 'LI', name: 'Litoral', countryCode: 'GQ' },
  { code: 'WN', name: 'Wele-Nzas', countryCode: 'GQ' },
];

export const COUNTRIES: Country[] = RAW_COUNTRIES.map((country) => ({
  ...country,
  states: RAW_STATES.filter((state) => state.countryCode === country.code),
}));
