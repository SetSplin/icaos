	.data    
    .global f
f:
	pushl	%ebp
    movl	%esp, %ebp
    
    movl	8(%ebp), %eax
    mull	%eax
    
    popl	%ebp
    ret