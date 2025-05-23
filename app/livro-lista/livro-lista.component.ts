import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necessário para usar *ngFor e *ngIf

import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule], // 👈 adiciona CommonModule aqui
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = [];

  constructor(
    private controleLivros: ControleLivrosService,
    private controleEditora: ControleEditoraService
  ) {}

  ngOnInit(): void {
    this.livros = this.controleLivros.obterLivros();
  }

  excluir(codigo: number): void {
    this.controleLivros.excluir(codigo);
    this.livros = this.controleLivros.obterLivros(); // Atualiza a lista após exclusão
  }

  obterNome(codEditora: number): string {
    return this.controleEditora.getNomeEditora(codEditora);
  }
}