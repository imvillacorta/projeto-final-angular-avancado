import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError, delay, finalize, map, retryWhen, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable()

export class HttpLoadingInterceptor implements HttpInterceptor {

    constructor(
        public loaderService: LoaderService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //SETA LOADING COMO TRUE PARA FICAR VISIVEL
        this.loaderService.isLoading.next(true);

        //ALTERA HEADERS PASSANDO TOKEN VALIDO

        // var user = JSON.parse(localStorage.getItem('user') || '{}');
        // var token = JSON.parse(localStorage.getItem('token') || '{}');

        // const headerAuth = req.clone({
        //     headers: req.headers.set('authorization', (user && token) ? 'Bearer' + token : ''),
        // });

        // return next.handle(headerAuth);

        return next.handle(req).pipe(

            //SOLICITAÇÃO REFEITA EM CASO DE ERRO
            retryWhen(err => {
                let retries = 1;
                return err.pipe(
                    delay(1000),
                    tap(() => {
                        console.error('Erro, tentativa ' + retries + ' de 3');
                    }),
                    map(error => {
                        if (retries++ === 3) {
                            throw error;
                        }
                        return error;
                    })
                )
            }),

            // ERROS RETORNADOS DA REQUISIÇÃO
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    //ERROS EM SCRIPTS OU ARQUIVOS
                    if (error.error instanceof ErrorEvent) {
                        console.log('error event', ErrorEvent);
                    }
                    else {
                        switch (error.status) {
                            case 401:      //FALHA NA AUTENTICAÇÃO
                                this.router.navigate([
                                    '/autenticacao/login'
                                ])
                                break;
                            case 404:     //URL NÃO ENCONTRADA
                                this.router.navigate([
                                    '/nao-encontrado'
                                ])
                                break;
                            default:
                                let textoErro = '';

                                if (error.error.errors) {
                                    textoErro = error.error.errors;
                                }
                                else {
                                    textoErro = 'Ocorreu um erro inesperado';
                                }

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ops!',
                                    text: textoErro,
                                    confirmButtonText: 'ENTENDI',
                                    confirmButtonColor: '#25bcd2',
                                    allowOutsideClick: false
                                });
                        }
                    }
                }

                return throwError(error);
            }),
            //FIM DA REQUISIÇÃO
            finalize(
                () => {
                    this.loaderService.isLoading.next(false);
                }
            )
        )

    }

}