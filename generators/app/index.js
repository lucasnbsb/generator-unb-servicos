'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
var _ = require('lodash');
//const chalk = require('chalk');

module.exports = class extends Generator {  

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Vamos criar sua entidade pro Unb-Servicos???')
    );

    const prompts = [
      {
        type: 'input',
        name: 'nome',
        message: 'Qual o nome da entidade?',
      },
      {
        type: 'list',
        name: 'area',
        message: 'Qual a area da nova entidade?',
        choices: [
          'academico', 'administrativo', 'pessoal', 'util'
        ]
      },
      {
        type: 'input',
        name: 'subarea',
        message: 'Qual o nome da área da entidade ? (deixe em branco para criar sem área)',
        default: ''
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  _toTitleCase(word) {
    return (word.slice(0, 1).toUpperCase() + word.slice(1))
  }

  writing() {
    let nome = this.props.nome.toLowerCase();
    let nomeTitleCase = this.props.nome.split(/(?=[A-Z])/).map(
      s => {
        s = s.toLowerCase()
        s = s.replace('-', '')
        s = s.replace('_', '')
        return s.slice(0, 1).toUpperCase() + s.slice(1)
      }
    ).filter(r => r == '' ? null : r).join('')

    let nomeDashCase = this.props.nome.split(/(?=[A-Z])/).map(
      s => {
        s = s.toLowerCase()
        s = s.replace('-', '')
        s = s.replace('_', '')
        return s.slice(0, 1) + s.slice(1)
      }
    ).filter(r => r == '' ? null : r).join('-')

    let nomeVariableCase = _.lowerFirst(nomeTitleCase);
    let nomeLowerCase = _.toLower(nomeTitleCase);
    let area = this.props.area;
    let subarea = this.props.subarea;
    let areaLower = _.toLower(area)
    let subLower = _.toLower(subarea)

    let url = '/' + area;

    //Preparando os parametros para a geracao dos arquivos
    //let nomeTitleCase = this._toTitleCase(nome);

    let facadePath = 'br.unb.' + area + '.facade';
    let applicationClass = '';
    let infraClass = '';
    // se deseja colocar numa subarea    
    if (subarea) {
      facadePath += '.' + subarea;
      applicationClass = this._toTitleCase(subarea) + 'Application'
      infraClass = this._toTitleCase(subarea) + 'Infra'
      url += '/' + subarea
    } else {
      applicationClass = this._toTitleCase(area) + 'Application'
      infraClass = this._toTitleCase(area) + 'Infra'
    }
    let modelPath = facadePath.replace('facade', 'model');
    let servicePath = facadePath.replace('facade', 'service');
    let infraPath = facadePath.replace('facade', 'infra');
    url += '/' + nome + '/';

    this.fs.copyTpl(
      this.templatePath('catalogo.json'),
      this.destinationPath('catalogo_' + nome + '.json'),
      {
        nomeTitleCase: nomeTitleCase,
        facadePath: facadePath,
        url: url,
      }
    )

    this.fs.copyTpl(
      this.templatePath('facade.java'),
      this.destinationPath(nomeTitleCase + 'Facade.java'),
      {
        nome: nome,
        nomeTitleCase: nomeTitleCase,
        applicationClass: applicationClass,
        facadePath: facadePath,
        modelPath: modelPath,
        servicePath: servicePath,
      }
    )

    this.fs.copyTpl(
      this.templatePath('service.java'),
      this.destinationPath(nomeTitleCase + 'Service.java'),
      {
        nomeTitleCase: nomeTitleCase,
        modelPath: modelPath,
        servicePath: servicePath,
        infraPath: infraPath,
        infraClass: infraClass,
      }
    )

    this.fs.copyTpl(
      this.templatePath('repository.java'),
      this.destinationPath(nomeTitleCase + 'Repository.java'),
      {
        nomeTitleCase: nomeTitleCase,
        modelPath: modelPath,
        infraPath: infraPath,
      }
    )

    this.fs.copyTpl(
      this.templatePath('complementos.java'),
      this.destinationPath(nomeTitleCase + 'Complementos.java'),
      {
        nomeTitleCase: nomeTitleCase,
        nomeVariableCase: nomeVariableCase,
        modelPath: modelPath,
        servicePath: servicePath,
        infraPath: infraPath,
        infraClass: infraClass,
      }
    )

    this.fs.copyTpl(
      this.templatePath('angularService.ts'),
      this.destinationPath(nomeDashCase + '.service.ts'),
      {
        nomeTitleCase: nomeTitleCase,
        nomeVariableCase: nomeVariableCase,
        nomeLowerCase: nomeLowerCase,
        areaLower: areaLower,
        subLower: subLower,
        modelPath: modelPath,
        servicePath: servicePath,
        infraPath: infraPath,
        infraClass: infraClass,
        nomeDashCase: nomeDashCase
      }
    )

  }

};
