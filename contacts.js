
// list of contacts for demo purposes
var contacts = [
    {
        id:1,
        name: "Friends",
        type: "Group",
        contacts: [
            {id:2, name: "Udi", type: "Contact"},
            {id:3, name: "Tommy", type: "Contact"},
            {
                id:6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    {id:7, name: "Itay", type: "Contact"},
                ]
            },
        ]
    },
    {
        id:4,
        name: "Family",
        type: "Group",
        contacts: [
            {id:5, name: "Roni", type: "Contact"},
        ]
    },
    {id: 8, name: "Ori", type: "Contact"},
];

$(document).ready( function() {
    // initialize the top level of contacts
    addContactsToDOM($('.contact-tree'), contacts);

    // add click event listener to expand or collapse contacts
    $('.contact-tree').on('click', 'li', function(event) {
        event.stopPropagation();
        
        if ($(this).hasClass('group')) {
            if ($(this).hasClass('expanded')) {
                // this contact is a group and is expanded, remove the subcontacts from the DOM
                $(this).children().remove('ul');
                $(this).removeClass('expanded');
            }
            else {
                // this contact is a group and is collapsed, expand it
                // find this element in the contact array
                var currContact = findInContacts(contacts, $(this).attr('id'));
                // add their contacts to the DOM
                addContactsToDOM($(this), currContact.contacts);
                $(this).addClass('expanded');
            }
       }
    });
});

function addContactsToDOM(parentNode, contactsArr) {
    var strArray = [];
    strArray.push('<ul>');
    $.each(contactsArr, function(i, val) {
        // add an li with the contact's id (contact name is a span for highlighting purposes)
        strArray.push('<li ');
        if (val.type === 'Group') {
            strArray.push('class="group"');
        }
        strArray.push('id="' + val.id + '"><span>' + val.name + '</span>');
        strArray.push('</li>');
    });
    strArray.push('</ul>');
    // add all contacts to the DOM
    var $contactList=$(strArray.join(''));
    parentNode.append($contactList);
}

function findInContacts(contactsArr, val) {
    // find a contact in the contacts array by its id
    for (var i = 0; i < contactsArr.length; i++) {
        if (contactsArr[i].id == val) {
            return contactsArr[i];
        }
        else if (contactsArr[i].type === 'Group') {
            var result = findInContacts(contactsArr[i].contacts, val);
            if (result) {
                return result;
            }
        }
    }
    
    return null;
}
