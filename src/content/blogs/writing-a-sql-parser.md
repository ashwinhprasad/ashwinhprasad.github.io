---
title: "Writing a SQL parser"
description: "A look into writing a simple recursive descent parser for parsing sql queries"
date: "2025-04-15"
---

A parser is a program that traverses through the sequence of input characters and generates an **Abstract Syntax Tree**, which is a structural way of representing a provided input *(SQL Query, Code Snippet, etc)*. Generating the abstract syntax tree makes certain things easier to do later on.

## Abstract Syntax Tree

An Abstract Syntax Tree in itself is nothing but a group of objects structured in a nested fashion *(and hence, the tree part)* that carry enough information, which can be efficiently processed by the next layer *(In this case, query planner)*. Well, there are some operations and sanity checks that will be performed on the AST before it can be consumed by the query planner but let's ignore that for now.


Let's see a visual example:

```cpp
class Expression {

    class Column {
        std::string name;
    };

    class Literal {
        std::string value;
    };

    class Operation {
        Expression left;
        std::string op;
        Expression right;
    }
    std::variant<Column, Literal, Operation> value;
};

class Condition {
    Expression left;
    std::string op; // '=', '>', '<', etc.
    Expression right;
};

class Join {
    std::string table;
    std::string type; // "INNER", "LEFT", "RIGHT", etc.
    Condition onCondition;
};

class SelectQuery {
    std::vector<Expression> columns;
    std::string table;
    std::vector<Join> joins;
    std::optional<Condition> where;
};

class InsertQuery {
    std::string table;
    std::vector<std::string> columns;
    std::vector<Expression> values;
};

class Query {
    std::variant<SelectQuery, InsertQuery> root;
};
```

The above are some of the classes or blueprint for the AST we are going to generate. The input string will be converted to an object of the ```Query``` class. Here is a example for visual representation of the AST for a sample input.


```sql
SELECT name, age + 21 
FROM students 
JOIN marks ON (students.id = marks.student)
WHERE marks.subject = 'chemistry';
```

The Abstract syntax tree generated for the above input would be the follows:

```rust
Query
└── SelectQuery
    ├── columns
    │   ├── Expression
    │   │   └── Column: name
    │   └── Expression
    │       └── Operation
    │           ├── left
    │           │   └── Column: age
    │           ├── op: +
    │           └── right
    │               └── Literal: 21
    ├── table: students
    ├── joins
    │   └── Join
    │       ├── table: marks
    │       ├── type: INNER
    │       └── onCondition
    │           ├── left
    │           │   └── Column: students.id
    │           ├── op: =
    │           └── right
    │               └── Column: marks.student
    └── where
        ├── left
        │   └── Column: marks.subject
        ├── op: =
        └── right
            └── Literal: 'chemistry'
```

Throughout the entire process of parsing, our goal would be to create a beautiful tree like above, which contains all the necessary information to create a query plan.

## A little bit into Backus-Naur Form

#### History

The creation of **FORTON**, widely regarded as the first high level programming language which is directly compiled to machine code is no ordinary feat. This was accomplished by [John Backus](https://en.wikipedia.org/wiki/John_Backus) and his team of engineers. While it was undeniably one of the greatest achievements of the time, fortron has it's issues in terms of formal syntax. At a later point in time, Backus got involved in another international effort to define a more formal, powerful and elegant language *(eventually resulting in **ALGOL 60**)*. It was formal, recursive, and highly structured. However, Backus’s original draft notation was still evolving *(it wasn't yet fully standardized)*.

[Peter Naur](https://en.wikipedia.org/wiki/Peter_Naur), a Danish computer scientist, was the editor for the final ALGOL 60 report. When Naur reviewed Backus's draft syntax, he recognized its value but also cleaned it up, gradually making it more systematic and consistent. 

Because of this major contribution, the notation became known as Backus-Naur Form **(BNF)**, honoring both John Backus and Peter Naur *(for the crucial refinement and editorial work that made it practical and widely accepted)*.The ALGOL 60 Report published this formal grammar, and it became a historical milestone. BNF introduced a precise, mathematical way to define the syntax of programming languages - a cornerstone concept for parsers, compilers, and programming language theory ever since.

It's magnitude is so heavy that nearly every programming language today has a formal grammar based on some variant of **BNF**.

#### Theory