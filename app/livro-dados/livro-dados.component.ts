import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  livro: Livro = {
    codigo: 0,
    codEditora: 0,
    titulo: '',
    resumo: '',
    autores: []
  };

  editoras: Editora[] = [];
  autoresTexto: string = '';

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = (): void => {
    this.livro.autores = this.autoresTexto
      .split('\n')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    // ✅ Adiciona o livro ao serviço
    this.servLivros.incluir(this.livro);

    // ✅ Redireciona para a lista após o cadastro
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/lista']);
    });
  };
}