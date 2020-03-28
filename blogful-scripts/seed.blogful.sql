BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('Title one', now() - '21 days'::INTERVAL, 'Content 1'),
    ('Title two', now() - '21 days'::INTERVAL, 'Content 2'),
    ('Title three', now() - '21 days'::INTERVAL, 'Content 3'),
    ('Title four', now() - '21 days'::INTERVAL, 'Content 4'),
    ('Title five', now() - '21 days'::INTERVAL, 'Content 5'),
    ('Title six', now() - '21 days'::INTERVAL, 'Content 6'),
    ('Title seven', now() - '21 days'::INTERVAL, 'Content 7'),
    ('Title eight', now() - '21 days'::INTERVAL, 'Content 8'),
    ('Title nine', now() - '21 days'::INTERVAL, 'Content 9'),
    ('Title ten', now() - '21 days'::INTERVAL, 'Content 10'),
    ('Title eleven', now() - '21 days'::INTERVAL, 'Content 11'),
    ('Title twelve', now() - '21 days'::INTERVAL, 'Content 12'),
    ('Title thirteen', now() - '21 days'::INTERVAL, 'Content 13'),
    ('Title fourteen', now() - '21 days'::INTERVAL, 'Content 14'),
    ('Title fifteen', now() - '21 days'::INTERVAL, 'Content 15')
;

COMMIT;