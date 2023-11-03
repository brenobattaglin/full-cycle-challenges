# FROM golang:1.21-alpine3.17 AS builder
FROM alpine:3.17 AS builder
WORKDIR /app
COPY hello.go .
RUN apk update && \
    apk add go && \
    go mod init hello && \
    go build hello

FROM scratch
COPY --from=builder /app/hello /hello
CMD ["/hello"]
