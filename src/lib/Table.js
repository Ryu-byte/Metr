"use strict";
import { reactive, watch } from "vue";

class TableColumn {
  constructor(field, title, sortable, align, classes) {
    this.name = field;
    this.label = title;
    this.field = field;
    this.sortable = sortable;
    this.align = align ?? "left";
    this.classes = classes ?? "";
  }

  static create(field, title, sortable, align, classes) {
    return new TableColumn(field, title, sortable, align, classes);
  }
}

class TableContainer {
  /**
   *
   * @param sortField string поле по которому сортировать
   * @param sortDesc boolean сортировать в обратном порядке
   * @param perPage int количество на странице
   * @param columns array of TableColumn количество на странице
   */
  constructor(sortField, sortDesc, perPage, columns) {
    this.list = [];
    this.pagination = {
      sortBy: sortField,
      descending: sortDesc,
      page: 1,
      rowsPerPage: perPage ?? 20,
      rowsNumber: 0,
    };
    this.meta = {};
    this.columns = columns ?? [];

    //для редактирования строки
    //editObj - копия строки, origObj - ссылка на объект строки
    //на editObj вешается диалог редактора. Если он null, диалог спрятан, как только присваивается ему значение,
    //диалог поднимается
    this.editObj = null;
    this.origOjb = null;
    //нужно передавать функцию, создающую новую строку
    this.createRowLocal = null;
    this.createRowRemote = () => {
      return { id: 0 };
    };
    this.disableEvents = false;
    this.allSelected = false;
    this.delItemsDialod = false;
    this.loading = false;
    this.deletable = false;
    this.loadApi = null;
    this.deleteApi = null;
    this._Filters = null;
    let me = reactive(this);
    this.load = (pagination) => {
      if (!me.loadApi) return;
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : me.pagination;
      me.loading = true;
      me.loadApi(pagination, me._Filters).then((data) => {
        me.loading = false;
        if (data) {
          me.pagination = pagination;
          me.assign(data);
        }
      });
    };
  }

  set Filters(Filters) {
    this._Filters = Filters;
    if (Filters)
      watch(
        () => Filters,
        (val, oldVal) => {
          this.load();
        },
        { deep: true }
      );
  }

  delSelected(inst, field) {
    if (!inst.deleteApi) return;
    let ids = inst.selectedIds(field);
    inst.deleteApi(ids).then((data) => {
      inst.loading = false;
      inst.load();
    });
  }

  setCreateLocal(fn) {
    if (typeof fn == "function") {
      this.createRowLocal = fn;
    } else {
      throw new Error(
        "в этот метод нужно передавать функцию, создающую новый экземпляр строки"
      );
    }
  }

  /**
   * нужно передавать ссылку на объект, потому что при вызове ивентов vue this не определён
   * @param me
   */
  rowCreateLocal(me) {
    if (!me.createRowLocal)
      throw new Error(
        "Чтобы автоматчески добавлять объекты, нужно передать функцию, " +
          'создающую пустой экзепляр объекта. Например Table.setCreateLocal(()=>{return {id:0, name:"Новый объект"};})'
      );
    me.editObj = me.createRowLocal();
  }

  /**
   * нужно передавать ссылку на объект, потому что при вызове ивентов vue this не определён
   * @param me
   */
  rowCreateRemote(me) {
    me.editObj = { id: 0, _create: true };
  }

  /**
   * нужно передавать ссылку на объект, потому что при вызове ивентов vue this не определён
   * @param me this object
   * @param obj object данные строки для редактирования
   */
  rowEdit(me, obj) {
    me.origOjb = obj;
    me.editObj = Object.assign({}, obj);
  }

  /**
   * нужно передавать ссылку на объект, потому что при вызове ивентов vue this не определён
   * @param me this object
   * @param obj - объект после сохранения
   * @param append boolean true если это был новый объект и его нужно добавить в таблицу
   */
  rowSaved(me, { obj, append, stay }) {
    //при сохранении объекта отредактированную копию кладём обратно в таблицу
    if (me.origOjb) Object.assign(me.origOjb, obj);
    //если был новый, добавляем в начало таблицы
    if (append) me.list.unshift(obj);
    if (!stay) {
      //скрываем диалог
      me.editObj = null;
      me.origOjb = null;
    }
  }

  /**
   * нужно передавать ссылку на объект, потому что при вызове ивентов vue this не определён
   * @param me
   */
  rowCancelEdit(me) {
    me.editObj = null;
    me.origOjb = null;
  }

  setColumns(columns) {
    this.columns = columns;
  }

  assign(httpResult) {
    for (let i = 0; i < httpResult.list.length; i++) {
      httpResult.list[i]._sel = false;
    }
    this.list = httpResult.list;
    this.pagination = httpResult.pagination;
    if (httpResult.meta) this.meta = httpResult.meta;
    this.selClick(this);
  }

  selClick(me) {
    me.disableEvents = true;
    let yes = 0;
    let no = 0;
    for (let i = 0; i < me.list.length; i++) {
      if (me.list[i]._sel) {
        yes++;
      } else {
        no++;
      }
    }
    if (yes > 0 && no > 0) {
      me.allSelected = null;
    } else {
      me.allSelected = yes > 0;
    }
    me.disableEvents = false;
  }

  selectedIds(field) {
    field = field ?? "id";
    const ids = [];
    for (let i in this.list) {
      if (!this.list.hasOwnProperty(i)) continue;
      if (this.list[i]._sel) {
        ids.push(this.list[i][field]);
      }
    }
    return ids;
  }

  massSelect(me) {
    if (me.allSelected == null) me.allSelected = true;

    for (let i = 0; i < me.list.length; i++) {
      me.list[i]._sel = me.allSelected;
    }
  }

  showDelDialog(me) {
    me.delItemsDialod = true;
  }

  rowStyle(row) {
    return "";
  }
}

function pasteHtmlAtCaret(html) {
  let sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      let el = document.createElement("div");
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}
function doAdjustEditorImages(editor) {
  console.log("resized ", editor);
  try {
    const element = editor.getContentEl();
    let computedStyle = getComputedStyle(element);

    let elementWidth = element.clientWidth; // width with padding

    elementWidth -=
      parseFloat(computedStyle.paddingLeft) +
      parseFloat(computedStyle.paddingRight);
    //debugger;

    const images = element.querySelectorAll(".news-image");
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = elementWidth + "px";
      images[i].style.width = "50%";
      images[i].style.display = "block";
    }
    const videos = element.querySelectorAll(".news-video");
    for (let i = 0; i < videos.length; i++) {
      videos[i].style.width = elementWidth + "px";
      videos[i].style.height = elementWidth * 0.75 + "px";
      videos[i].style.display = "block";
    }
    element.lastWidth = elementWidth;
  } catch (error2) {
    console.log(error2);
  }
}
function onEditorResize(editor, force) {
  setTimeout(() => {
    //сначала прячем все картинки и видео
    //если ширина не изменилась, просто снова их показываем
    //если изменилась, пересчитываем размеры

    try {
      const element = editor.getContentEl();
      let elementWidth = element.clientWidth; // width with padding
      let computedStyle = getComputedStyle(element);
      elementWidth -=
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight);
      const lastWidth = element.lastWidth;

      const images = element.querySelectorAll(".news-image");
      for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      const videos = element.querySelectorAll(".news-video");
      for (let i = 0; i < videos.length; i++) {
        videos[i].style.display = "none";
      }
      if (force) {
        setTimeout(() => {
          doAdjustEditorImages(editor);
        }, 200);
        return;
      }
      setTimeout(() => {
        const element = editor.getContentEl();
        let elementWidth = element.clientWidth; // width with padding
        let computedStyle = getComputedStyle(element);
        elementWidth -=
          parseFloat(computedStyle.paddingLeft) +
          parseFloat(computedStyle.paddingRight);
        const lastWidth = element.lastWidth;
        if (lastWidth === elementWidth) {
          const images = element.querySelectorAll(".news-image");
          for (let i = 0; i < images.length; i++) {
            images[i].style.display = "block";
          }
          const videos = element.querySelectorAll(".news-video");
          for (let i = 0; i < videos.length; i++) {
            videos[i].style.display = "block";
          }
          return;
        }
        doAdjustEditorImages(editor);
      }, 200);
      setTimeout(() => {
        doAdjustEditorImages(editor);
      }, 200);
    } catch (error) {
      console.log(error);
    }
  }, 200);
}

export default {
  TableColumn,
  TableContainer,
  pasteHtmlAtCaret,
  onEditorResize,
};
