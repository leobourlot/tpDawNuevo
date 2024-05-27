import { Component } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [BaseComponent, FontAwesomeModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
}