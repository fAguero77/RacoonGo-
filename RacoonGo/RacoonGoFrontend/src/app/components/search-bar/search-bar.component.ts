import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HelperService } from '../../services/helper.service';
import { BackendRouterService } from '../../services/backend-router.service';
import { Option, Question, Game, Event, Location, User, BackEndResponse } from "../../models/app.model";
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    constructor(public helperService: HelperService, private backEndResponse: BackendRouterService) { }

    // Este booleano se usa en el .html para mostrar u ocultar cosas y en el .js para 
    //  llamar a los métodos del servicio correctos (eventos o juegos)
    // Se tiene que determinar en el .html que llama a este componente (<search-bar [isEventSearch]=true>)
    @Input() isEventSearch = true;
    @Output() parentListUpdate = new EventEmitter<any>();

    // -- BÚSQUEDA BÁSICA --
    submitSearch!: FormGroup;

    // -- BÚSQUEDA AVANZADA --
    submitSearchAdvance!: FormGroup;
    // menu de etiquetas
    dropdownListTags: any[] = [];
    selectedTags: any[] = [];
    dropdownSettingsTags: IDropdownSettings = {};
    // menu de rango de edad
    dropdownListAge: any[] = [];
    selectedAge: any[] = [];
    dropdownSettingsAge: IDropdownSettings = {};
    // menu dificultad de juego
    dropdownListDifficulty: any[] = [];
    selectedDifficulty: any[] = [];
    dropdownSettingsDifficulty: IDropdownSettings = {};

    ngOnInit() {
        // -- BÚSQUEDA BÁSICA --
        this.submitSearch = new FormGroup({
            query: new FormControl(''),
        });

        // -- BÚSQUEDA AVANZADA --

        if (this.isEventSearch) {
            this.submitSearchAdvance = new FormGroup({
                title: new FormControl(''),
                location: new FormControl(''),
                iniDate: new FormControl(null),
                endDate: new FormControl(null),
                userCompany: new FormControl(''),
                description: new FormControl(''),
                selectedTags: new FormControl([]),
                age: new FormControl(-1),
            });
            // inicializar menu de etiquetas
            for (let i = 0; i < 10; i++) {
                this.dropdownListTags.push({ item_id: i, item_text: this.helperService.getThemeInfo(i)[0] });
            }
            this.dropdownSettingsTags = {
                singleSelection: false,
                idField: 'item_id',
                textField: 'item_text',
                selectAllText: 'Seleccionar todas',
                unSelectAllText: 'Deseleccionar todas',
                enableCheckAll: false,
                itemsShowLimit: 3,
                allowSearchFilter: true,
                searchPlaceholderText: 'Buscar',
                noDataAvailablePlaceholderText: 'No hay etiquetas disponibles',
                noFilteredDataAvailablePlaceholderText: 'No hay etiquetas filtradas',
            };
            // inicializar menu de rango de edades
            for (let i = 0; i < 5; i++) {
                this.dropdownListAge.push({ item_id: i, item_text: this.helperService.getAgeText(i) });
            }
            this.dropdownSettingsAge = {
                singleSelection: true,
                idField: 'item_id',
                textField: 'item_text',
                allowSearchFilter: true,
                searchPlaceholderText: 'Buscar',
                noDataAvailablePlaceholderText: 'No hay edades disponibles',
                noFilteredDataAvailablePlaceholderText: 'No hay edades filtradas',
            };
        } else {
            this.submitSearchAdvance = new FormGroup({
                title: new FormControl(''),
                user: new FormControl(''),
                description: new FormControl(''),
                difficulty: new FormControl(-1),
                numQuestions: new FormControl(),
                numPlayers: new FormControl(),
            });
            // inicializar menu de dificultad
            for (let i = 0; i < 3; i++) {
                this.dropdownListDifficulty.push({ item_id: i, item_text: this.helperService.getDifficultyInfo(i) });
            }
            this.dropdownSettingsDifficulty = {
                singleSelection: true,
                idField: 'item_id',
                textField: 'item_text',
                allowSearchFilter: false,
                noDataAvailablePlaceholderText: 'No hay dificultades disponibles',
                noFilteredDataAvailablePlaceholderText: 'No hay dificultades filtradas',
            };
        }

    }

    // -- BÚSQUEDA BÁSICA --
    submitSearchFunction() {
        let query = this.submitSearch.value.query;

        // Búsqueda básica de eventos
        if (this.isEventSearch) {
            // Si no hay nada en el input de búsqueda, se hace una petición para obtener todos los eventos
            if (query === "") {
                this.backEndResponse.endpoints.event.getEvents().subscribe({
                    next: (data: HttpResponse<BackEndResponse<any>>) => {
                        this.parentListUpdate.emit(data.body);
                    },
                });
            } else {
                // Si hay algo en el input de búsqueda, se hace una petición para obtener los eventos que coincidan con la búsqueda
                this.backEndResponse.endpoints.event.search(query).subscribe({
                    next: (data: HttpResponse<BackEndResponse<any>>) => {
                        // Actualizar lista del padre (events-list)
                        this.parentListUpdate.emit(data.body);
                    },
                    error: () => {
                        Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int&#233;ntelo de nuevo en unos minutos.', 'error');
                    }
                });

            }

        } else {
            // Si no hay nada en el input de búsqueda, se hace una petición para obtener todos los juegos
            if (query === "") {
                this.backEndResponse.endpoints.game.getGames().subscribe({
                    next: (data: HttpResponse<BackEndResponse<any>>) => {
                        this.parentListUpdate.emit(data.body);
                    },
                });
            } else {
                // Si hay algo en el input de búsqueda, se hace una petición para obtener los juegos que coincidan con la búsqueda
                this.backEndResponse.endpoints.game.search(query).subscribe({
                    next: (data: HttpResponse<BackEndResponse<any>>) => {
                        // Actualizar lista del padre (events-list)
                        this.parentListUpdate.emit(data.body);
                    },
                    error: () => {
                        Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int&#233;ntelo de nuevo en unos minutos.', 'error');
                    }
                });

            }
        }


    }


    // -- BÚSQUEDA AVANZADA --
    submitSearchAdvanceFunction() {

        if (this.isEventSearch) {
            // para el avanzado le pasamos un evento con todos los parámetros de la búsqueda dentro
            let query: Event =
            {
                title: this.submitSearchAdvance.value.title,
                description: this.submitSearchAdvance.value.description,
                id: '',
                recommendedAge: -1,
                startDate: this.submitSearchAdvance.value.iniDate,
                endDate: this.submitSearchAdvance.value.endDate,
                themes: [],
                location: { name: this.submitSearchAdvance.value.location, lat: -1, lon: -1 },
                photoUrl: '',
                user: { username: this.submitSearchAdvance.value.userCompany, email: "", score: -1, phoneNumber: "", website: "", sponsored: new Date()}
            };

            if (this.submitSearchAdvance.value.age.length > 0)
            {
                query.recommendedAge = this.submitSearchAdvance.value.age[0].item_id;
            }

            if (this.submitSearchAdvance.value.selectedTags.length > 0) {
                query.themes = [this.submitSearchAdvance.value.selectedTags.length];
                for (var i = 0; i < this.submitSearchAdvance.value.selectedTags.length; i++) {
                    query.themes[i] = this.submitSearchAdvance.value.selectedTags[i].item_id;
                }
            }

            console.log(query);
            this.backEndResponse.endpoints.event.searchAdvance(query).subscribe({
                next: (data: HttpResponse<BackEndResponse<any>>) => {
                    // Actualizar lista del padre (events-list)
                    this.parentListUpdate.emit(data.body);
                },
                error: () => {
                    Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int&#233;ntelo de nuevo en unos minutos.', 'error');
                }
            });
        } else {

            let query: Game =
            {
                name: this.submitSearchAdvance.value.title,
                description: this.submitSearchAdvance.value.description,
                difficulty: -1,
                id: [this.submitSearchAdvance.value.numQuestions]?.toString(), // pasamos el número de preguntas como id
                questions: [],
                hidden: false,
                timesPlayed: this.submitSearchAdvance.value.numPlayers ?? -1,
                email: this.submitSearchAdvance.value.user
            };

            if (this.submitSearchAdvance.value.difficulty.length > 0) {
                query.difficulty = this.submitSearchAdvance.value.difficulty[0].item_id;
            }

            console.log(query);
            this.backEndResponse.endpoints.game.searchAdvance(query).subscribe({
                next: (data: HttpResponse<BackEndResponse<any>>) => {
                    // Actualizar lista del padre (events-list)
                    this.parentListUpdate.emit(data.body);
                },
                error: () => {
                    Swal.fire('Error', 'Se ha producido un error al buscar juegos. Int&#233;ntelo de nuevo en unos minutos.', 'error');
                }
            });
        }
    }
}
