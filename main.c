#include <stdio.h>
#include <string.h>

/*
 * FoCP C project: the core item-board logic is written in C.
 * The browser interface calls these functions through WebAssembly.
 */
#define MAX_ITEMS 100
#define FIELD 221

typedef struct {
    char kind[8], name[51], place[71], contact[81], details[FIELD];
} Item;

static Item items[MAX_ITEMS];
static int item_count = 0;
static char output[24000];

static void copy_text(char *dest, const char *src, int size) {
    if (!src) src = "";
    snprintf(dest, size, "%s", src);
}

int add_item(const char *kind, const char *name, const char *place,
             const char *contact, const char *details) {
    if (item_count >= MAX_ITEMS || !name || !name[0] ||
        !place || !place[0] || !contact || !contact[0]) return 0;

    Item *item = &items[item_count++];
    copy_text(item->kind, kind, sizeof(item->kind));
    copy_text(item->name, name, sizeof(item->name));
    copy_text(item->place, place, sizeof(item->place));
    copy_text(item->contact, contact, sizeof(item->contact));
    copy_text(item->details, details, sizeof(item->details));
    return 1;
}

int get_item_count(void) { return item_count; }

/* Return one field of an item. Field: 0=kind, 1=name, 2=place, 3=contact, 4=details. */
const char *get_item_field(int index, int field) {
    if (index < 0 || index >= item_count) return "";
    switch (field) {
        case 0: return items[index].kind;
        case 1: return items[index].name;
        case 2: return items[index].place;
        case 3: return items[index].contact;
        case 4: return items[index].details;
        default: return "";
    }
}

void clear_items(void) { item_count = 0; }
