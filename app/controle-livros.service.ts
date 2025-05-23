import { Injectable } from '@angular/core';
import { Livro } from './livro';

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private livros: Array<Livro> = [
    {
      codigo: 1,
      codEditora: 1,
      titulo: 'Angular Básico',
      resumo: 'Livro introdutório sobre Angular',
      autores: ['Autor A', 'Autor B']
    },
    {
      codigo: 2,
      codEditora: 2,
      titulo: 'Avançando em Angular',
      resumo: 'Técnicas avançadas com Angular',
      autores: ['Autor C']
    },
    {
      codigo: 3,
      codEditora: 3,
      titulo: 'Full Stack com Angular',
      resumo: 'Construindo aplicações completas',
      autores: ['Autor D', 'Autor E']
    }
  ];

  obterLivros(): Array<Livro> {
    return this.livros;
  }

  incluir(livro: Livro): void {
    // Gera um novo código seguro, mesmo se livros forem excluídos
    const novoCodigo = this.livros.length > 0
      ? Math.max(...this.livros.map(l => l.codigo)) + 1
      : 1;

    livro.codigo = novoCodigo;
    this.livros.push(livro);
  }

  excluir(codigo: number): void {
    const index = this.livros.findIndex(l => l.codigo === codigo);
    if (index > -1) {
      this.livros.splice(index, 1);
    }
  }
}