import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxDiagramComponent} from "../../projects/ngx-diagram/src/lib/ngx-diagram.component";

//import {NgxDiagramComponent} from 'ngx-diagram';

function id() {
    return '' + Math.random().toString(36).substr(2, 9);
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('diagram') diagram: NgxDiagramComponent;
    selection = [];

    nodes = [];
    links = [];

    ngOnInit() {

        this.nodes = [{id: id()}];
        for (let i = 0; i < 10; i++) {
            const idl = id();
            this.nodes.push({id: idl});
        }

        this.nodes.forEach(source => {
            for (let i = 0; i < 1; i++) {
                const target = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                if (source.id !== target.id) {
                    this.links.push({source: source.id, target: target.id});
                }
            }
        });

        this.diagram.updateNodes(this.nodes); // First the nodes then the links
        this.diagram.updateLinks(this.links);
        this.diagram.redraw();


    }

    connected(connection) {

        if (connection.source.id !== connection.target.id) {
            this.links.push({source: connection.source.id, target: connection.target.id});

            this.diagram.updateLinks(this.links);
            this.diagram.redraw();

        }

    }

    created(creation) {

        const node = {id: id()};
        this.nodes.push(node);

        this.diagram.updateNodes(this.nodes);
        this.diagram.moveNodeTo(node.id, creation.x, creation.y);
        this.diagram.redraw();

    }

    selected(selection) {

        this.selection = selection;

    }

    deleteSelected() {

        this.nodes = this.nodes.filter(node => !this.selection.find(n => node.id === n.id));
        this.links = this.links.filter(link => !(this.selection.find(n => link.source === n.id || link.target === n.id)));

        this.diagram.updateNodes(this.nodes);
        this.diagram.redraw();
        this.selection = [];

    }

    deleteLinksBetweenSelected() {

        this.links = this.links.filter(link => !(this.selection.find(n => link.source === n.id) && this.selection.find(n => link.target === n.id)));

        this.diagram.updateLinks(this.links);
        this.diagram.redraw();

    }

    autoLayout() {
        this.diagram.autoLayout().then();
    }
}
