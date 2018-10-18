'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-unb-servicos:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ nome: 'atribuicao', area: 'academico', subarea: 'sipic' });
  });

  it('creates files', () => {
    assert.file(['atribuicao.catalogo.json']);
  });
});
